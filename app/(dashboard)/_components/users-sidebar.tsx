import { useEffect, useState } from "react";
import { Tables } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOpenStore } from "@/store/new-chat";
import { Phone } from "lucide-react";
import { IoChatbubbleEllipsesOutline, IoFilter } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTag,  getTags, removeTag, Tag } from "@/lib/queries/tags";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getAlTags } from "@/lib/queries/tags";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMagnifyingGlass } from "react-icons/hi2";

type Profile = Tables<"profiles">;

interface SidebarProps {
  users: Profile[];
  startChat: (receiverId: string) => void;
}

// Utility to generate a pseudo-random phone number based on user id
function getRandomPhone(userId: string) {
  // Simple hash for demo purposes
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Generate a 10-digit number
  const num = Math.abs(hash % 9000000000) + 1000000000;
  return `+91 ${num}`;
}

// Utility to generate a pseudo-random date in the last 30 days based on user id
function getRandomDate(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const daysAgo = Math.abs(hash % 30) + 1;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString();
}

const UsersSidebar = ({ users, startChat }: SidebarProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [modalUser, setModalUser] = useState<Profile | null>(null);
  const [showAllTagsUser, setShowAllTagsUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useCurrentUser();
  const [userTags, setUserTags] = useState<Record<string, string[]>>({});
  const { setOpen } = useOpenStore();
  const [tagFilter, setTagFilter] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  // Filter by tag
  let filteredUsers = tagFilter && tagFilter !== "all"
    ? users.filter(u => userTags[u.id]?.includes(tagFilter))
    : users;

  // Further filter by search
  if (searchValue.trim() !== "") {
    filteredUsers = filteredUsers.filter(u =>
      u.full_name?.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    startChat(userId);
    setOpen(false)
  };
  const fetchTags = async () => {
    if (!user?.id || users.length === 0) return;
    const tagsObj: Record<string, string[]> = {};
    for (const u of users) {
      const { data } = await getTags(u.id);
      tagsObj[u.id] = (data || []).map((tag) => tag.tag?.name || '').filter((name) => name !== '');
    }
    setUserTags(tagsObj);
  };
  useEffect(() => {
    fetchTags();
  }, [user?.id, users]);
  const handleAddTag = async (chatUser: Profile) => {
    if (!selectedTagId) return;
    setLoading(true);
    try {
      await addTag(user.id, chatUser.id, selectedTagId);
      setModalUser(null);
      setSelectedTagId("");
      fetchTags();
    } catch (error) {
      console.error("Error adding tag:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveTag = async (chatUser: Profile, tagName: string) => {
    setLoading(true);
    try {
      // Find tag id by name
      const tagObj = allTags.find(t => t.name === tagName);
      if (!tagObj) throw new Error('Tag not found');
      await removeTag(user.id, chatUser.id, tagObj.id);
      setShowAllTagsUser(null);
      fetchTags();
    } catch (error) {
      console.error("Error removing tag:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchAllTags = async () => {
      const { data } = await getAlTags();
      setAllTags(data || []);
    };
    fetchAllTags();
  }, []);
  return (
    <div className="h-[calc(100vh-58px)]  w-full relative ">
      <div className="absolute bottom-0 right-1 bg-[#15803d] hover:bg-[#15803d]/90 text-white rounded-full p-3 z-40 cursor-pointer ">
        <IoChatbubbleEllipsesOutline className="size-6" />
      </div>
      <div className="h-10 bg-gray-100 border px-2 py-0 flex items-center justify-end gap-2 text-xs border-b border-gray-200">
        {searchOpen ? (
          <div className="flex items-center gap-1">
            <Input
              className="h-8 text-xs px-2 w-40  focus:ring-0  rounded-none bg-white text-green-800 focus-visible:ring-[0px]"
              autoFocus
              placeholder="Search user..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onBlur={() => { if (searchValue === "") setSearchOpen(false); }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-xs"
              onClick={() => { setSearchOpen(false); setSearchValue(""); }}
            >
              ✕
            </Button>
          </div>
        ) : (
          <Button className="h-8 focus:ring-0 text-xs text-green-800 focus-visible:ring-[0px]" size={"sm"} variant={"outline"}
            onClick={() => setSearchOpen(true)}
          >
            <HiMagnifyingGlass className="size-4" />
            Search
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 focus:ring-0 text-xs text-green-800 focus-visible:ring-[0px]" size={"sm"} variant={"outline"} >
              <IoFilter className="size-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTagFilter("all")}>All</DropdownMenuItem>

            {allTags.map(tag => (
              <DropdownMenuItem key={tag.id} onClick={() => setTagFilter(tag.name)}>{tag.name}</DropdownMenuItem>

            ))}

          </DropdownMenuContent>
        </DropdownMenu>


      </div>
      <ScrollArea className=" h-[calc(100vh-93px)] ">
        {filteredUsers.map((u) => (
          <Card
            key={u.id}
            onContextMenu={(e) => {
              e.preventDefault();
              setModalUser(u);
            }}
            className={`p-3 overflow-hidden rounded-[5px] border-0 h-20 w-full  cursor-pointer relative 
              ${selectedUserId === u.id
                ? "bg-gray-100 hover:bg-gray-300"
                : "bg-white hover:bg-gray-200"
              } shadow-none`}
            onClick={() => handleUserClick(u.id)}
          >
            <div className="absolute top-2 right-5 flex items-end gap-1">
              {(userTags[u.id]?.length > 0 ? userTags[u.id] : []).slice(0, 2).map((tag, idx) => (
                <span
                  key={tag + idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllTagsUser(u);
                  }}
                  className="inline-flex items-center justify-center px-2 py-[1px] text-[10px] h-5 font-bold leading-none bg-green-100 border-[1px] border-green-400 text-green-600 rounded-[1px] mb-1"
                >
                  {tag}
                </span>
              ))}
              {userTags[u.id]?.length > 2 && (
                <span
                  className="inline-flex items-center justify-center px-1 py-[1px] text-[10px] h-5 font-bold leading-none bg-gray-200 border-[1px] border-gray-400 text-gray-700 rounded-full mb-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllTagsUser(u);
                  }}
                >
                  +{userTags[u.id].length - 2}
                </span>
              )}
            </div>
            <div className="flex gap-3 w-full">
              <div className="relative">
                <Avatar >
                  <AvatarImage src={u.avatar_url as string} />
                  <AvatarFallback>{u.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>

              </div>

              <div className="space-y-1.5 w-full">
                <div>
                  <div className="text-sm font-semibold">{u.full_name}</div>
                  <div className="flex items-center">
                    <div className="text-xs line-clamp-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Autem, fugit.
                    </div>

                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[10px] flex items-center font-extralight bg-gray-100 rounded-[5px] w-28   px-2 py-[1px] gap-1">
                    <Phone className="size-2" />
                    <span> {getRandomPhone(u.id)} </span>
                  </div>
                  <div className="text-[10px] font-extralight">
                    {getRandomDate(u.id)}
                  </div>
                </div>


              </div>
            </div>
          </Card>
        ))}

      </ScrollArea>

      <Dialog open={!!modalUser} onOpenChange={(open) => !open && setModalUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tag for {modalUser?.full_name}?</DialogTitle>
            <DialogDescription>
              You can add tag/label to {modalUser?.full_name}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Select value={selectedTagId ?? ''} onValueChange={(value) => setSelectedTagId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id} className="capitalize">
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => handleAddTag(modalUser as Profile)} disabled={loading || !selectedTagId}>
              {loading ? "Saving..." : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!showAllTagsUser} onOpenChange={(open) => !open && setShowAllTagsUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>All tags for {showAllTagsUser?.full_name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-2">
            {showAllTagsUser &&
              (userTags[showAllTagsUser.id]?.length
                ? userTags[showAllTagsUser.id].map((tag, idx) => (
                  <div
                    key={tag + idx}
                    className="flex items-center justify-between  gap-2 w-20 px-2 py-[1px] h-8 text-[10px] font-bold leading-none bg-green-100 border-[1px] border-green-400 text-green-600 rounded-[1px] relative"
                  >
                    <span className="">{tag}</span>
                    <button
                      type="button"
                      className=" text-red-500 hover:text-red-700 text-xs font-bold  bg-white rounded-full px-1 border border-red-200"
                      title="Remove tag"
                      onClick={() => handleRemoveTag(showAllTagsUser, tag)}
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                ))
                : <span className="text-xs text-gray-500">No tags</span>
              )
            }
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default UsersSidebar;
