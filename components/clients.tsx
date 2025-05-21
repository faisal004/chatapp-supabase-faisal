import Image from 'next/image';
import React from 'react';

export function Clients() {
  const logos = [
    { name: 'Plum', url: "/plum.png" },
    { name: 'Treebo', url: "/treebo.png" },
    { name: 'Zostel', url: "/zostel.png" },
    { name: 'Plum', url: "/plum.png" },
    { name: 'Treebo', url: "/treebo.png" },
    { name: 'Plum', url: "/plum.png" },
    { name: 'Treebo', url: "/treebo.png" },
    { name: 'Zostel', url: "/zostel.png" },
    { name: 'Plum', url: "/plum.png" },
    { name: 'Treebo', url: "/treebo.png" },
  ];

  return (
    <section className="py-5 flex flex-col items-center justify-center"
      style={
        {
          background: 'linear-gradient(180deg,var(--token-e3adc95c-c95f-4a68-8074-3aa00953f704, #041200) 0%,rgb(9,48,40) 100%)'
        }
      }
    >
      <div className="max-w-[900px] mx-auto px-4 flex flex-col items-center justify-center ">
        <div className="text-center mb-10">
          <p className="text-white/70 text-lg">Powering 5000+ businesses across 50+ countries</p>
        </div>

        <div className="flex flex-wrap gap-10 items-center justify-center">
          {logos.map((logo, index) => (
            <div key={index} className="h-12 flex items-center justify-center">
              <Image src={logo.url} alt={logo.name} width={130} height={130} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
