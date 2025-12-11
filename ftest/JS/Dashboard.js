const defaultProjects = [
          {
          id: crypto.randomUUID(),
          name: "Creek Town",
          location: "New Cairo",
          developer: "Il Cazar Developments",
          img: "https://aldiyaralasrea.com/wp-content/uploads/2023/10/Creek-Town-New-Cairo-4-1024x584.webp",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Creek Apt 101",
              type: "Apartment",
              location: "Phase 1 - Building A",
              area: "128 m²",
              price: "EGP 4,500,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2025 Q4",
              img: "https://picsum.photos/300/200?random=5011",
              desc: "Modern apartment surrounded by greenery and water features.",
              status: "Available",
              images: [
                "https://picsum.photos/300/200?random=5011",
                "https://picsum.photos/300/200?random=5012",
              ],
            },
            {
              id: crypto.randomUUID(),
              name: "Creek Townhouse T3",
              type: "Townhouse",
              location: "Phase 2 - Townhouses",
              area: "185 m²",
              price: "EGP 7,900,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2026 Q1",
              img: "https://picsum.photos/300/200?random=5013",
              desc: "Townhouse with private garden and community views.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=5013"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Palm Hills New Cairo",
          location: "New Cairo",
          developer: "Palm Hills Developments",
          img: "https://element-realestate.com/wp-content/uploads/2023/10/PHEONIX-100-1.jpg",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Palm Hills Apt B12",
              type: "Apartment",
              location: "Residential Zone - Building B",
              area: "140 m²",
              price: "EGP 5,200,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2023 Q2",
              img: "https://picsum.photos/300/200?random=5021",
              desc: "Elegant apartment in a premium gated community.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5021"],
            },
            {
              id: crypto.randomUUID(),
              name: "Palm Hills Villa V7",
              type: "Villa",
              location: "Villas Area",
              area: "300 m²",
              price: "EGP 15,500,000",
              rooms: 5,
              payment: "Installments",
              delivery: "2024 Q4",
              img: "https://picsum.photos/300/200?random=5022",
              desc: "Standalone villa with spacious layout and landscaped surroundings.",
              status: "Sold",
              images: ["https://picsum.photos/300/200?random=5022"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "ZED East Strip",
          location: "New Cairo",
          developer: "ORA Developers",
          img: "https://www.egymls.com/wp-content/uploads/2024/06/zed-east-strip-new-cairo-ora-developers-5jpeg-1200x900-1.jpg",
          units: [
            {
              id: crypto.randomUUID(),
              name: "ZED Apt S1",
              type: "Apartment",
              location: "Strip Residence - Tower 1",
              area: "112 m²",
              price: "EGP 4,000,000",
              rooms: 2,
              payment: "Installments",
              delivery: "2027 Q1",
              img: "https://picsum.photos/300/200?random=5031",
              desc: "Contemporary apartment within a mixed-use destination.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5031"],
            },
            {
              id: crypto.randomUUID(),
              name: "ZED Duplex D5",
              type: "Duplex",
              location: "Strip Residence - Tower 2",
              area: "205 m²",
              price: "EGP 7,600,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2027 Q2",
              img: "https://picsum.photos/300/200?random=5032",
              desc: "Spacious duplex with modern finishes.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=5032"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Hyde Park New Cairo",
          location: "New Cairo",
          developer: "Hyde Park Developments",
          img: "https://dlleni.com/wp-content/uploads/2024/09/hyde-park-new-cairo-2.jpg",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Hyde Villa H-11",
              type: "Villa",
              location: "Garden Villas District",
              area: "280 m²",
              price: "EGP 13,200,000",
              rooms: 5,
              payment: "Installments",
              delivery: "2026 Q3",
              img: "https://picsum.photos/300/200?random=5041",
              desc: "Award-winning community with vast green spaces and lakes.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5041"],
            },
            {
              id: crypto.randomUUID(),
              name: "Hyde Townhouse T-22",
              type: "Townhouse",
              location: "Townhouses District",
              area: "175 m²",
              price: "EGP 7,300,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2026 Q4",
              img: "https://picsum.photos/300/200?random=5042",
              desc: "Townhouse near the clubhouse and central park.",
              status: "Sold",
              images: ["https://picsum.photos/300/200?random=5042"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "PRK VIE",
          location: "New Cairo",
          developer: "Upwyde Developments",
          img: "https://th.bing.com/th/id/OIP.-t-jWctdM03jsYTiq9xoRwHaEW?w=323&h=189&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "PRK Clinic C-03",
              type: "Clinic",
              location: "Medical Hub - Ground Floor",
              area: "62 m²",
              price: "EGP 3,250,000",
              rooms: 0,
              payment: "Installments",
              delivery: "2026 Q2",
              img: "https://picsum.photos/300/200?random=5051",
              desc: "Medical/clinic unit in a luxury residential development.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5051"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Bloomfields",
          location: "Mostakbal City",
          developer: "Tatweer Misr",
          img: "https://tse2.mm.bing.net/th/id/OIP.vy00i-qQ4cfMrlv1kYjF8wHaDU?rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Bloom Apt A7",
              type: "Apartment",
              location: "Residential Zone - Building A",
              area: "118 m²",
              price: "EGP 3,900,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2027 Q2",
              img: "https://picsum.photos/300/200?random=5061",
              desc: "Green, sustainable community with modern urban living.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5061"],
            },
            {
              id: crypto.randomUUID(),
              name: "Bloom Duplex D2",
              type: "Duplex",
              location: "Duplex District",
              area: "210 m²",
              price: "EGP 6,800,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2027 Q3",
              img: "https://picsum.photos/300/200?random=5062",
              desc: "Duplex with wide terraces and park view.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=5062"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Montenapoleone",
          location: "New Cairo",
          developer: "Reportage Properties",
          img: "https://tse3.mm.bing.net/th/id/OIP.V77Wjzx7EzIwapWyraMPRAHaFD?rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Monte Apt M5",
              type: "Apartment",
              location: "Italian District - Building M",
              area: "135 m²",
              price: "EGP 4,700,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2026 Q2",
              img: "https://picsum.photos/300/200?random=5071",
              desc: "Italian-inspired residences with timeless design.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5071"],
            },
            {
              id: crypto.randomUUID(),
              name: "Monte Townhouse T9",
              type: "Townhouse",
              location: "Townhouse Lane",
              area: "170 m²",
              price: "EGP 6,900,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2026 Q4",
              img: "https://picsum.photos/300/200?random=5072",
              desc: "Elegant townhouse with premium finishing.",
              status: "Sold",
              images: ["https://picsum.photos/300/200?random=5072"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Taj City",
          location: "New Cairo",
          developer: "MNHD",
          img: "https://tse1.mm.bing.net/th/id/OIP.3tB1pCOVtzTxc3RFFZqv5AHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Taj Apt T12",
              type: "Apartment",
              location: "Central Apartments",
              area: "125 m²",
              price: "EGP 3,800,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2026 Q4",
              img: "https://picsum.photos/300/200?random=5081",
              desc: "Urban community in the heart of Cairo with strong amenities.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5081"],
            },
            {
              id: crypto.randomUUID(),
              name: "Taj Penthouse P3",
              type: "Penthouse",
              location: "Sky Residences",
              area: "190 m²",
              price: "EGP 7,200,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2027 Q1",
              img: "https://picsum.photos/300/200?random=5082",
              desc: "Penthouse with open terrace and skyline view.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=5082"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Mountain View iCity New Cairo",
          location: "New Cairo",
          developer: "Mountain View (DMG)",
          img: "https://realestate.eg/ckfinder/userfiles/images/Mountain%20View%20iCity%20compound%20New%20Cairo/Icity-New-Cairo.jpg",
          units: [
            {
              id: crypto.randomUUID(),
              name: "iCity Apt I-21",
              type: "Apartment",
              location: "iDrive District",
              area: "110 m²",
              price: "EGP 3,650,000",
              rooms: 2,
              payment: "Installments",
              delivery: "2027 Q1",
              img: "https://picsum.photos/300/200?random=5091",
              desc: "Well-planned development with diverse housing options.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5091"],
            },
            {
              id: crypto.randomUUID(),
              name: "iCity Twin House TH-4",
              type: "Twin House",
              location: "Villas District",
              area: "240 m²",
              price: "EGP 10,500,000",
              rooms: 5,
              payment: "Installments",
              delivery: "2027 Q2",
              img: "https://picsum.photos/300/200?random=5092",
              desc: "Twin house with garden and modern facade.",
              status: "Sold",
              images: ["https://picsum.photos/300/200?random=5092"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Stone Residence",
          location: "New Cairo",
          developer: "PRE Developments",
          img: "https://tse1.mm.bing.net/th/id/OIP.Wkgm2Wlph1ljevfadZN57gHaEc?rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Stone Apt S-08",
              type: "Apartment",
              location: "Main Cluster - Building S",
              area: "150 m²",
              price: "EGP 4,950,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2023 Q4",
              img: "https://picsum.photos/300/200?random=5101",
              desc: "Gated community with tranquil atmosphere and top facilities.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=5101"],
            },
            {
              id: crypto.randomUUID(),
              name: "Stone Penthouse PH-2",
              type: "Penthouse",
              location: "Upper Floors",
              area: "210 m²",
              price: "EGP 7,800,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2024 Q2",
              img: "https://picsum.photos/300/200?random=5102",
              desc: "Penthouse with large terrace and pool view.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=5102"],
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          name: "TALALA",
          location: "New Heliopolis",
          developer: "Misr Italia Properties",
          img: "https://th.bing.com/th?id=OIF.%2bCOICSyos6BPPzRO2zbDPg&rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Talala Apt 101",
              type: "Apartment",
              location: "Phase 1 - Building A",
              area: "120 m²",
              price: "EGP 4,200,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2027",
              img: "https://picsum.photos/300/200?random=1011",
              desc: "Modern apartment in a prime New Heliopolis location.",
              status: "Available",
              images: [
                "https://picsum.photos/300/200?random=1011",
                "https://picsum.photos/300/200?random=1012",
              ],
            },
            {
              id: crypto.randomUUID(),
              name: "Talala Villa V12",
              type: "Villa",
              location: "Phase 2 - Villas",
              area: "260 m²",
              price: "EGP 12,800,000",
              rooms: 5,
              payment: "Installments",
              delivery: "2028",
              img: "https://picsum.photos/300/200?random=1013",
              desc: "Standalone villa with private garden.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=1013"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Mamsha Vista",
          location: "New Administrative Capital",
          developer: "City Edge Developments",
          img: "https://tse3.mm.bing.net/th/id/OIP.tusOPL79e0RXfG6Zp3nIqwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Vista Apt A1",
              type: "Apartment",
              location: "Residential Tower 1",
              area: "105 m²",
              price: "EGP 3,600,000",
              rooms: 2,
              payment: "Cash",
              delivery: "Immediate",
              img: "https://picsum.photos/300/200?random=1021",
              desc: "City view apartment near central services.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=1021"],
            },
            {
              id: crypto.randomUUID(),
              name: "Vista Duplex D3",
              type: "Duplex",
              location: "Residential Tower 2",
              area: "210 m²",
              price: "EGP 7,900,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2027",
              img: "https://picsum.photos/300/200?random=1022",
              desc: "Duplex with spacious terraces.",
              status: "Sold",
              images: ["https://picsum.photos/300/200?random=1022"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "Canan Capital Mall",
          location: "Maadi",
          developer: "La Sirena Group",
          img: "https://tse3.mm.bing.net/th/id/OIP.jGQfEHmrh5DThghh4pAS7AHaET?rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Retail R-05",
              type: "Retail",
              location: "Ground Floor",
              area: "70 m²",
              price: "EGP 6,500,000",
              rooms: 0,
              payment: "Installments",
              delivery: "2026",
              img: "https://picsum.photos/300/200?random=1031",
              desc: "Prime retail unit facing the main entrance.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=1031"],
            },
            {
              id: crypto.randomUUID(),
              name: "Office O-18",
              type: "Office",
              location: "Second Floor",
              area: "95 m²",
              price: "EGP 5,200,000",
              rooms: 0,
              payment: "Cash",
              delivery: "2026",
              img: "https://picsum.photos/300/200?random=1032",
              desc: "Office unit with open layout.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=1032"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "The Signature Tower",
          location: "Heliopolis",
          developer: "A Capital Holding",
          img: "https://www.zaha-hadid.com/wp-content/uploads/2019/12/1281_rend_0596.jpg",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Signature Studio S9",
              type: "Studio",
              location: "Tower A - Floor 9",
              area: "55 m²",
              price: "EGP 2,250,000",
              rooms: 1,
              payment: "Cash",
              delivery: "Immediate",
              img: "https://picsum.photos/300/200?random=1041",
              desc: "Fully finished studio in Heliopolis.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=1041"],
            },
            {
              id: crypto.randomUUID(),
              name: "Signature Apt 1204",
              type: "Apartment",
              location: "Tower B - Floor 12",
              area: "145 m²",
              price: "EGP 5,800,000",
              rooms: 3,
              payment: "Installments",
              delivery: "2027",
              img: "https://picsum.photos/300/200?random=1042",
              desc: "Apartment with panoramic city view.",
              status: "Sold",
              images: ["https://picsum.photos/300/200?random=1042"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "WATERLYN",
          location: "Mostakbal City",
          developer: "The MarQ Communities",
          img: "https://tse3.mm.bing.net/th/id/OIP.xfqRQpFnq80h9F69_42txAHaEw?rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Waterlyn Townhouse T7",
              type: "Townhouse",
              location: "Cluster C",
              area: "190 m²",
              price: "EGP 8,900,000",
              rooms: 4,
              payment: "Installments",
              delivery: "2028",
              img: "https://picsum.photos/300/200?random=1051",
              desc: "Townhouse in a green, walkable community.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=1051"],
            },
            {
              id: crypto.randomUUID(),
              name: "Waterlyn Apt B2",
              type: "Apartment",
              location: "Building B",
              area: "115 m²",
              price: "EGP 3,950,000",
              rooms: 2,
              payment: "Installments",
              delivery: "2027",
              img: "https://picsum.photos/300/200?random=1052",
              desc: "Cozy apartment close to clubhouse.",
              status: "Pending",
              images: ["https://picsum.photos/300/200?random=1052"],
            },
          ],
        },

        {
          id: crypto.randomUUID(),
          name: "SUITE HUB",
          location: "New Administrative Capital",
          developer: "Radix Developments",
          img: "https://tse2.mm.bing.net/th/id/OIP.zRD55shryrJFPOndonMAbwHaEf?w=665&h=404&rs=1&pid=ImgDetMain&o=7&rm=3",
          units: [
            {
              id: crypto.randomUUID(),
              name: "Suite Hub Hotel Unit H-22",
              type: "Hotel Apartment",
              location: "Hotel Tower",
              area: "48 m²",
              price: "EGP 2,700,000",
              rooms: 1,
              payment: "Installments",
              delivery: "2026",
              img: "https://picsum.photos/300/200?random=1061",
              desc: "Serviced hotel apartment suitable for investment.",
              status: "Available",
              images: ["https://picsum.photos/300/200?random=1061"],
            },
            {
              id: crypto.randomUUID(),
              name: "Suite Hub Office O-06",
              type: "Office",
              location: "Business Floor",
              area: "60 m²",
              price: "EGP 3,100,000",
              rooms: 0,
              payment: "Cash",
              delivery: "Immediate",
              img: "https://picsum.photos/300/200?random=1062",
              desc: "Compact office unit with high footfall.",
              status: "Sold",
              images: ["https://picsum.photos/300/200?random=1062"],
            },
          ],
        },

        // ===== New Cairo latest projects =====
        {
          id: crypto.randomUUID(),
          name: "AZZAR Legacy",
          location: "New Cairo",
          developer: "Reedy Group",
          img: "https://picsum.photos/600/400?random=201",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "The Mornings",
          location: "New Cairo",
          developer: "Al Ahly Sabbour",
          img: "https://picsum.photos/600/400?random=202",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Triangle",
          location: "Fifth Settlement - New Cairo",
          developer: "The Waterway Developments",
          img: "https://picsum.photos/600/400?random=203",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Red G Garnet",
          location: "New Cairo",
          developer: "Jadeer Developments",
          img: "https://picsum.photos/600/400?random=204",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Hyde Park Central",
          location: "Sixth Settlement - New Cairo",
          developer: "Hyde Park Developments",
          img: "https://picsum.photos/600/400?random=205",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Garnet Residence",
          location: "New Cairo",
          developer: "Al Ahly Sabbour",
          img: "https://picsum.photos/600/400?random=206",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Jade & Blue",
          location: "New Cairo",
          developer: "Aspect Developments",
          img: "https://picsum.photos/600/400?random=207",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Dijar Tower",
          location: "New Cairo",
          developer: "Reedy Group",
          img: "https://picsum.photos/600/400?random=208",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "SA’ADA Boutique",
          location: "New Cairo",
          developer: "Horizon Egypt",
          img: "https://picsum.photos/600/400?random=209",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "KasaKuōn Eastville",
          location: "New Cairo",
          developer: "Ajna Developments",
          img: "https://picsum.photos/600/400?random=210",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "The Grid",
          location: "New Cairo",
          developer: "Upwyde Developments",
          img: "https://picsum.photos/600/400?random=211",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Central Residence (inside Hyde Park Central)",
          location: "Sixth Settlement - New Cairo",
          developer: "Hyde Park Developments",
          img: "https://picsum.photos/600/400?random=212",
          units: [],
        },

        // ===== October & Sheikh Zayed latest projects =====
        {
          id: crypto.randomUUID(),
          name: "WestView Residence",
          location: "New Sheikh Zayed",
          developer: "Housing & Development Properties",
          img: "https://picsum.photos/600/400?random=301",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Key of Greens",
          location: "New Sheikh Zayed",
          developer: "Tabarak Developments",
          img: "https://picsum.photos/600/400?random=302",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Junction Mall",
          location: "6th of October City",
          developer: "Majid Al Futtaim",
          img: "https://picsum.photos/600/400?random=303",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "One Three One",
          location: "New Sheikh Zayed",
          developer: "Zaya Developments",
          img: "https://picsum.photos/600/400?random=304",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "BEING",
          location: "6th of October City",
          developer: "Landmark Developments",
          img: "https://picsum.photos/600/400?random=305",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "REWAYA",
          location: "Sheikh Zayed",
          developer: "Siac Developments",
          img: "https://picsum.photos/600/400?random=306",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "WESTDAYS",
          location: "6th of October City",
          developer: "Alcazar Developments",
          img: "https://picsum.photos/600/400?random=307",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Kinz (Azha West)",
          location: "New Sheikh Zayed",
          developer: "Madaar Developments",
          img: "https://picsum.photos/600/400?random=308",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "One50",
          location: "New Sheikh Zayed",
          developer: "El Gabry Developments",
          img: "https://picsum.photos/600/400?random=309",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "The Quad",
          location: "Sheikh Zayed",
          developer: "Arkan Palm Developments",
          img: "https://picsum.photos/600/400?random=310",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Parkside (O West)",
          location: "October Gardens",
          developer: "Orascom Development Egypt",
          img: "https://picsum.photos/600/400?random=311",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Jirian",
          location: "Sheikh Zayed",
          developer: "Palm Hills + Mountain View",
          img: "https://picsum.photos/600/400?random=312",
          units: [],
        },

        // ===== North Coast latest projects =====
        {
          id: crypto.randomUUID(),
          name: "BRANDED Residence (Silver Sands)",
          location: "Sidi Heneish - North Coast",
          developer: "ORA Developers",
          img: "https://picsum.photos/600/400?random=401",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Crystal Bay (Hacienda Heneish)",
          location: "Sidi Heneish - North Coast",
          developer: "Palm Hills Developments",
          img: "https://picsum.photos/600/400?random=402",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Solare North Coast",
          location: "Ras El Hekma - North Coast",
          developer: "Misr Italia Properties",
          img: "https://picsum.photos/600/400?random=403",
          units: [],
        },
        {
          id: crypto.randomUUID(),
          name: "Hacienda Blue",
          location: "El Dabaa - North Coast",
          developer: "Palm Hills Developments",
          img: "https://picsum.photos/600/400?random=404",
          units: [],
        },
      ];

function loadProjectsFromLocalStorage() {
  const raw = localStorage.getItem("projectsData");
  let stored = [];

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) stored = parsed;
    } catch (e) {
      console.warn("projectsData corrupted, using defaults", e);
      stored = [];
    }
  }

  // ✅ defaults FIRST, but if stored has same project name, keep stored data //
  const merged = defaultProjects.map((dp) => {
    const match = stored.find(
      (sp) =>
        (sp.name || "").trim().toLowerCase() ===
        (dp.name || "").trim().toLowerCase()
    );
    return match
      ? { ...dp, ...match, units: match.units || dp.units || [] }
      : dp;
  });

  // add any extra stored projects not in defaults //
  stored.forEach((sp) => {
    const exists = merged.some(
      (p) =>
        (p.name || "").trim().toLowerCase() ===
        (sp.name || "").trim().toLowerCase()
    );
    if (!exists) merged.push(sp);
  });

  localStorage.setItem("projectsData", JSON.stringify(merged));
  return merged;
}

let projects = loadProjectsFromLocalStorage();

// دالة لحفظ البيانات في localStorage
function saveProjectsToLocalStorage() {
  localStorage.setItem("projectsData", JSON.stringify(projects));
}

let currentProjectId = null; // لاستخدامه في مودال الوحدات
const projectsGrid = document.getElementById("projectsGrid");
const modalUnitsContainer = document.getElementById("modalUnitsContainer");
const unitsModalLabel = document.getElementById("unitsModalLabel");

const unitsModal = new bootstrap.Modal(document.getElementById("unitsModal"));
const projectFormModal = new bootstrap.Modal(
  document.getElementById("projectFormModal")
);
const unitFormModal = new bootstrap.Modal(
  document.getElementById("unitFormModal")
);

// ====== Summary Metrics Update ======
function updateSummaryMetrics() {
  let totalAvailable = 0;
  let totalSold = 0;
  let totalPending = 0;
  let totalAll = 0;

  projects.forEach((project) => {
    (project.units || []).forEach((unit) => {
      totalAll++; // ✅ ALWAYS count the unit

      const status = (unit.status || "").trim().toLowerCase();
      if (status === "available") totalAvailable++;
      else if (status === "sold") totalSold++;
      else if (status === "pending") totalPending++;
    });
  });

  document.getElementById("unitsAvailableCount").textContent = totalAvailable;
  document.getElementById("unitsSoldCount").textContent = totalSold;
  document.getElementById("unitsPendingCount").textContent = totalPending;
  document.getElementById("unitsAllCount").textContent = totalAll; // ✅ real total

  saveProjectsToLocalStorage();
}

// ====== Render Projects (FEATURED on Dashboard) ======
const FEATURED_PROJECTS_LIMIT = 6;

function renderProjects({ limit = null } = {}) {
  // ✅ if no limit passed AND we are on dashboard page → force featured limit
  if (
    limit == null &&
    window.location.pathname.toLowerCase().includes("dashbord")
  ) {
    limit = FEATURED_PROJECTS_LIMIT;
  }

  projectsGrid.innerHTML = "";

  const list = limit ? projects.slice(0, limit) : projects;

  list.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

    col.innerHTML = `
      <article class="project-card" data-id="${
        p.id
      }" tabindex="0" aria-label="Project ${p.name}">
        <img src="${p.img}" alt="${
      p.name
    }" class="project-image" loading="lazy" onerror="this.style.display='none';" />
        <div class="project-info">
          <h6>${p.name}</h6>
          <span>${(p.units || []).length} units</span>
          <div class="project-actions">
            <button class="btn btn-sm btn-outline-light" data-action="addUnit"><i class="bi bi-plus-lg"></i> Unit</button>
            <button class="btn btn-sm btn-outline-warning" data-action="editProject"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger" data-action="deleteProject"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </article>
    `;
    projectsGrid.appendChild(col);

    // Click handlers
    const card = col.querySelector(".project-card");
    card.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("button[data-action]");
      if (actionBtn) return;
      const id = card.getAttribute("data-id");
      openUnitsModal(id);
    });

    // Action buttons
    const addUnitBtn = col.querySelector('button[data-action="addUnit"]');
    const editBtn = col.querySelector('button[data-action="editProject"]');
    const delBtn = col.querySelector('button[data-action="deleteProject"]');

    addUnitBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = card.getAttribute("data-id");
      currentProjectId = id;
      openUnitForm();
    });

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = card.getAttribute("data-id");
      openProjectForm(id);
    });

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = card.getAttribute("data-id");
      deleteProject(id);
    });
  });

  // If we are limiting (dashboard), add a "View All Projects" card
  if (limit && projects.length > limit) {
    const moreCol = document.createElement("div");
    moreCol.className = "col-6 col-sm-4 col-md-3 col-lg-2";

    projectsGrid.appendChild(moreCol);
  }
}

// ====== Init render ======
renderProjects({ limit: FEATURED_PROJECTS_LIMIT });
updateSummaryMetrics();

// ====== Units Modal & rendering ======
function openUnitsModal(projectId) {
  currentProjectId = projectId;
  const project = projects.find((p) => p.id === projectId);
  unitsModalLabel.textContent = `Units in ${project.name}`;
  renderUnits();
  unitsModal.show();
}

function renderUnits() {
  const project = projects.find((p) => p.id === currentProjectId);
  modalUnitsContainer.innerHTML = "";

  if (!project || project.units.length === 0) {
    modalUnitsContainer.innerHTML =
      '<p class="text-center text-muted">No units found for this project.</p>';
    return;
  }
  function deleteUnit(unitId) {
    if (!currentProjectId) return;

    const project = projects.find((p) => p.id === currentProjectId);
    if (!project) return;

    const unit = project.units.find((u) => u.id === unitId);
    if (!unit) return;

    const ok = confirm(`Are you sure you want to delete "${unit.name}"?`);
    if (!ok) return;

    // remove unit
    project.units = project.units.filter((u) => u.id !== unitId);

    // save + refresh UI
    saveProjectsToLocalStorage();
    renderUnits();
    renderProjects({ limit: FEATURED_PROJECTS_LIMIT });
    updateSummaryMetrics(); // updates summary counters
  }

  project.units.forEach((unit) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    col.innerHTML = `
          <div class="card bg-secondary text-light mb-3 shadow-sm">
            <img src="${
              unit.img ||
              (unit.images && unit.images.length > 0
                ? unit.images[0]
                : "https://picsum.photos/300/200")
            }" class="card-img-top" alt="${unit.name}">
            <div class="card-body">
              <h5 class="card-title">${unit.name}</h5>
              <p class="card-text mb-1">Type: ${unit.type || "-"}</p>
              <p class="card-text mb-1">Area: ${unit.area || "-"}</p>
              <p class="card-text mb-1">Rooms: ${unit.rooms ?? "-"}</p>
              <p class="card-text mb-1">Price: ${unit.price || "-"}</p>
              <p class="card-text mb-1">Payment: ${unit.payment || "-"}</p>
              <p class="card-text mb-1">Delivery: ${unit.delivery || "-"}</p>
              <p class="card-text mb-1">Status: ${unit.status || "-"}</p>
              ${unit.desc ? `<p class="card-text small">${unit.desc}</p>` : ""}
              <div class="d-flex gap-2 mt-2">
                <button class="btn btn-sm btn-warning" data-unit="${
                  unit.id
                }"><i class="bi bi-pencil"></i> Edit</button>
                <button class="btn btn-sm btn-danger" data-del="${
                  unit.id
                }"><i class="bi bi-trash"></i> Delete</button>
              </div>
            </div>
          </div>
        `;
    modalUnitsContainer.appendChild(col);

    // Edit / Delete handlers
    col.querySelector("[data-unit]").addEventListener("click", () => {
      openUnitForm(unit.id);
      if (unit.status === "Sold" || unit.status === "Pending") {
        // updateEmployeeDealCount('some-employee-id', unit.price);
      }
    });
    col
      .querySelector("[data-del]")
      .addEventListener("click", () => deleteUnit(unit.id));
  });
}

// ====== Project CRUD ======
document
  .getElementById("addProjectBtn")
  .addEventListener("click", () => openProjectForm());

function openProjectForm(id = null) {
  const title = document.getElementById("projectFormTitle");
  const projectId = document.getElementById("projectId");
  const name = document.getElementById("projectName");
  const locationInput = document.getElementById("projectLocation");
  const img = document.getElementById("projectImg");
  const imgFile = document.getElementById("projectImgFile");
  const imgPreview = document.getElementById("projectImgPreview");

  if (id) {
    const p = projects.find((pr) => pr.id === id);
    title.textContent = "Edit Project";
    projectId.value = p.id;
    name.value = p.name;
    locationInput.value = p.location || "";
    img.value = p.img || "";
    imgPreview.src = p.img || "/placeholder.svg";
    imgPreview.style.display = p.img ? "block" : "none";
    imgFile.value = "";
  } else {
    title.textContent = "Add Project";
    projectId.value = "";
    name.value = "";
    locationInput.value = "";
    img.value = "";
    imgPreview.src = "/placeholder.svg";
    imgPreview.style.display = "none";
    imgFile.value = "";
  }

  projectFormModal.show();
}

document.getElementById("saveProjectBtn").addEventListener("click", () => {
  const id = document.getElementById("projectId").value;
  const name = document.getElementById("projectName").value.trim();
  const location = document.getElementById("projectLocation").value.trim();
  const img = document.getElementById("projectImg").value.trim();

  if (!name) {
    alert("Project Name cannot be empty.");
    return;
  }

  if (id) {
    const p = projects.find((pr) => pr.id === id);
    if (p) {
      p.name = name;
      p.location = location;
      p.img = img || p.img;
    }
  } else {
    if (projects.some((p) => p.name === name)) {
      alert("A project with this name already exists.");
      return;
    }
    projects.push({
      id: crypto.randomUUID(),
      name,
      location,
      img: img || "",
      units: [],
    });
    addNotification(
      "project",
      `Project "${name}" created successfully!`,
      `New project added to the system.`
    );
  }

  localStorage.setItem("projectsData", JSON.stringify(projects));
  projectFormModal.hide();
  renderProjects({ limit: FEATURED_PROJECTS_LIMIT });
  updateSummaryMetrics();
});

function deleteProject(id) {
  if (
    !confirm("Are you sure you want to delete this project and all its units?")
  )
    return;
  projects = projects.filter((p) => p.id !== id);
  if (currentProjectId === id) unitsModal.hide();
  renderProjects({ limit: FEATURED_PROJECTS_LIMIT });
  updateSummaryMetrics();
}

// ====== Unit CRUD ======
document
  .getElementById("addUnitBtn")
  .addEventListener("click", () => openUnitForm());

function openUnitForm(unitId = null) {
  const title = document.getElementById("unitFormTitle");
  const uid = document.getElementById("unitId");
  const name = document.getElementById("unitName");
  const area = document.getElementById("unitArea");
  const rooms = document.getElementById("unitRooms");
  const locationInput = document.getElementById("unitLocation");
  const price = document.getElementById("unitPrice");
  const payment = document.getElementById("unitPayment");
  const delivery = document.getElementById("unitDelivery");
  const status = document.getElementById("unitStatus");
  const desc = document.getElementById("unitDesc");
  const type = document.getElementById("unitType");
  const imgFilesInput = document.getElementById("unitImgFiles");
  const imgUrlsInput = document.getElementById("unitImgUrls");
  const previewContainer = document.getElementById("unitImgPreviewContainer");

  if (!currentProjectId) return;

  if (unitId) {
    const project = projects.find((p) => p.id === currentProjectId);
    const u = project.units.find((x) => x.id === unitId);
    if (u) {
      title.textContent = "Edit Unit";
      uid.value = u.id;
      name.value = u.name || "";
      area.value = (u.area || "").toString().replace(" m²", "");
      rooms.value = u.rooms ?? "";
      locationInput.value = u.location || "";
      price.value = u.price || "";
      payment.value = u.payment || "Cash";
      delivery.value = u.delivery || "Immediate";
      status.value = u.status || "Available";
      const images = u.images || [];
      imgUrlsInput.value = JSON.stringify(images);
      desc.value = u.desc || "";
      type.value = u.type || "Apartment";
      updateImagePreview(images);
      imgFilesInput.value = "";
    }
  } else {
    title.textContent = "Add Unit";
    uid.value = "";
    name.value = "";
    area.value = "";
    rooms.value = "";
    locationInput.value = "";
    price.value = "";
    payment.value = "Cash";
    delivery.value = "Immediate";
    status.value = "Available";
    imgFilesInput.value = "";
    imgUrlsInput.value = JSON.stringify([]);
    desc.value = "";
    type.value = "Apartment";
    previewContainer.innerHTML = "";
  }

  unitFormModal.show();
}

function updateImagePreview(images = []) {
  const previewContainer = document.getElementById("unitImgPreviewContainer");
  previewContainer.innerHTML = "";

  const imageArray = Array.isArray(images) ? images : [];

  if (imageArray.length === 0) {
    previewContainer.innerHTML =
      '<small class="text-muted">No images added yet</small>';
    return;
  }

  imageArray.forEach((src, index) => {
    if (!src) return;
    const div = document.createElement("div");
    div.style.position = "relative";
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.borderRadius = "8px";
    div.style.overflow = "hidden";
    div.style.border = "2px solid #FFC300";
    div.style.backgroundColor = "#f0f0f0";

    const img = document.createElement("img");
    img.src = src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.onload = () => (img.style.opacity = "1");
    img.onerror = () => {
      img.style.opacity = "0.5";
      img.title = "Failed to load image";
    };
    img.style.opacity = "0.7";
    img.style.transition = "opacity 0.3s";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn btn-sm btn-danger";
    removeBtn.textContent = "×";
    removeBtn.style.position = "absolute";
    removeBtn.style.top = "-8px";
    removeBtn.style.right = "-8px";
    removeBtn.style.padding = "2px 7px";
    removeBtn.style.fontSize = "16px";
    removeBtn.style.zIndex = "10";
    removeBtn.onclick = () => removeImagePreview(index);

    div.appendChild(img);
    div.appendChild(removeBtn);
    previewContainer.appendChild(div);
  });
}

function removeImagePreview(index) {
  const imgUrlsInput = document.getElementById("unitImgUrls");
  let images = [];
  try {
    images = JSON.parse(imgUrlsInput.value || "[]");
  } catch (e) {
    images = [];
  }
  images.splice(index, 1);
  imgUrlsInput.value = JSON.stringify(images);
  updateImagePreview(images);
}

document.getElementById("unitImgFiles").addEventListener("change", function () {
  const files = Array.from(this.files);
  const urlsInput = document.getElementById("unitImgUrls");
  let existingImages = [];
  try {
    existingImages = JSON.parse(urlsInput.value || "[]");
  } catch (e) {
    existingImages = [];
  }

  if (files.length === 0) return;

  Promise.all(
    files.map((file) => {
      return new Promise((resolve) => {
        if (!file.type.startsWith("image/")) {
          console.log("[v0] Skipping non-image file:", file.name);
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => {
          console.log("[v0] Error reading file:", file.name);
          resolve(null);
        };
        reader.readAsDataURL(file);
      });
    })
  ).then((dataUrls) => {
    const validUrls = dataUrls.filter((u) => u !== null);
    const allImages = [...existingImages, ...validUrls];
    urlsInput.value = JSON.stringify(allImages);
    updateImagePreview(allImages);

    document.getElementById("unitImgFiles").value = "";
  });
});

document.getElementById("unitImgUrls").addEventListener("input", function () {
  let images = [];
  try {
    images = JSON.parse(this.value || "[]");
  } catch (e) {
    images = [];
  }
  updateImagePreview(images);
});

document.getElementById("saveUnitBtn").addEventListener("click", () => {
  if (!currentProjectId) return;

  const uid = document.getElementById("unitId").value;
  const name = document.getElementById("unitName").value.trim();
  const area = parseFloat(document.getElementById("unitArea").value) || 0;
  const rooms = parseInt(document.getElementById("unitRooms").value || "0", 10);
  const location = document.getElementById("unitLocation").value.trim();
  const price = document.getElementById("unitPrice").value.trim();
  const payment = document.getElementById("unitPayment").value;
  const delivery = document.getElementById("unitDelivery").value;
  const status = document.getElementById("unitStatus").value;
  const desc = document.getElementById("unitDesc").value.trim();
  const type = document.getElementById("unitType").value;
  let images = [];
  try {
    images = JSON.parse(document.getElementById("unitImgUrls").value || "[]");
  } catch (e) {
    images = [];
  }

  if (!name) {
    alert("Unit name is required");
    return;
  }

  const project = projects.find((p) => p.id === currentProjectId);
  if (!project) return;

  if (uid) {
    const u = project.units.find((x) => x.id === uid);
    if (u) {
      const oldStatus = u.status;

      u.name = name;
      u.area = area > 0 ? `${area} m²` : "";
      u.rooms = rooms;
      u.location = location;
      u.price = price;
      u.payment = payment;
      u.delivery = delivery;
      u.status = status;
      u.img = images.length > 0 ? images[0] : u.img;
      u.images = images;
      u.desc = desc;
      u.type = type;

      if (oldStatus !== status) {
        if (status === "Sold") {
          addNotification(
            "unit",
            `Unit "${name}" Sold!`,
            `Unit in ${project.name} has been sold.`
          );
        } else if (status === "Pending") {
          addNotification(
            "unit",
            `Unit "${name}" - Deal Pending`,
            `Unit in ${project.name} is now pending.`
          );
        } else if (status === "Available") {
          addNotification(
            "unit",
            `Unit "${name}" Available`,
            `Unit in ${project.name} is now available.`
          );
        }
      }
    }
  } else {
    project.units = project.units || [];

    const normalizedNewName = name.trim().toLowerCase();
    const exists = project.units.some(
      (u) => (u.name || "").trim().toLowerCase() === normalizedNewName
    );

    if (exists) {
      alert("A unit with this name already exists in this project.");
      return;
    }
    project.units.push({
      id: crypto.randomUUID(),
      name,
      area: area > 0 ? `${area} m²` : "",
      rooms,
      location,
      price,
      payment,
      delivery,
      status,
      img: images.length > 0 ? images[0] : "",
      images: images,
      desc,
      type,
    });
    addNotification(
      "unit",
      `Unit "${name}" Added`,
      `New unit "${name}" has been added to ${project.name}.`
    );
  }

  localStorage.setItem("projectsData", JSON.stringify(projects));
  unitFormModal.hide();
  renderUnits();
  renderProjects();
  updateSummaryMetrics();
});

// ====== Excel Import Functionality ======
const excelFileInput = document.getElementById("excelFileInput");
const importExcelBtn = document.getElementById("importExcelBtn");
const loadingOverlay = document.getElementById("loadingOverlay");

importExcelBtn.addEventListener("click", () => {
  excelFileInput.click();
});

excelFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    loadingOverlay.style.display = "flex";
    const reader = new FileReader();

    reader.onload = (e) => {
      let importSuccess = false;
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        if (workbook.SheetNames.includes("Projects")) {
          const projectsWorksheet = workbook.Sheets["Projects"];
          const projectsJson = XLSX.utils.sheet_to_json(projectsWorksheet);
          processProjectsFromExcel(projectsJson);
          importSuccess = true;
        } else {
          alert(
            'Excel file must contain a sheet named "Projects". Import aborted.'
          );
        }

        if (workbook.SheetNames.includes("Units")) {
          const unitsWorksheet = workbook.Sheets["Units"];
          const unitsJson = XLSX.utils.sheet_to_json(unitsWorksheet);
          processUnitsFromExcel(unitsJson);
        }

        renderProjects({ limit: FEATURED_PROJECTS_LIMIT });
        updateSummaryMetrics();
        if (importSuccess) {
          alert(
            `${
              workbook.SheetNames.includes("Units")
                ? "Projects and units"
                : "Projects"
            } imported successfully!`
          );
        }
        saveProjectsToLocalStorage();
      } catch (error) {
        console.error("Error processing Excel file:", error);
        alert(
          "Error processing Excel file. Please ensure it is a valid Excel format and columns are correct."
        );
      } finally {
        loadingOverlay.style.display = "none";
        excelFileInput.value = "";
      }
    };
    reader.onerror = function (error) {
      console.error("FileReader error:", error);
      alert("Error reading file. Please try again.");
      loadingOverlay.style.display = "none";
      excelFileInput.value = "";
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert("Please select an Excel file to import.");
  }
});

function processProjectsFromExcel(data) {
  data.forEach((row) => {
    const projectName = row["ProjectName"];
    const projectImg = row["ProjectImage"] || "";

    if (
      !projectName ||
      typeof projectName !== "string" ||
      projectName.trim() === ""
    ) {
      console.warn(
        "Skipping project row due to invalid or missing 'ProjectName':",
        row
      );
      return;
    }

    let project = projects.find((p) => p.name === projectName);
    if (!project) {
      projects.push({
        id: crypto.randomUUID(),
        name: projectName,
        img: projectImg,
        units: [],
      });
    } else {
      if (projectImg && !project.img) {
        project.img = projectImg;
      }
    }
  });
}

function processUnitsFromExcel(data) {
  data.forEach((row) => {
    const projectName = row["ProjectName"];
    const unitName = row["UnitName"];
    const unitArea = parseFloat(row["UnitArea"]) || 0;
    const unitRooms = parseInt(row["UnitRooms"]) || 0;
    const unitLocation = row["UnitLocation"] || "";
    const unitPrice = row["UnitPrice"];
    const unitPayment = row["UnitPayment"];
    const unitDelivery = row["UnitDelivery"];
    const unitStatus = row["UnitStatus"] || "Available";
    const unitImg = row["UnitImage"] || "";
    const unitDesc = row["UnitDescription"] || "";
    const unitImages = row["UnitImages"];

    if (
      !projectName ||
      typeof projectName !== "string" ||
      projectName.trim() === ""
    ) {
      console.warn(
        "Skipping unit row due to invalid or missing 'ProjectName':",
        row
      );
      return;
    }
    if (!unitName || typeof unitName !== "string" || unitName.trim() === "") {
      console.warn(
        "Skipping unit row due to invalid or missing 'UnitName':",
        row
      );
      return;
    }

    const project = projects.find((p) => p.name === projectName);
    if (project) {
      let unit = project.units.find((u) => u.name === unitName);

      let parsedUnitImages = [];
      if (unitImages && typeof unitImages === "string") {
        parsedUnitImages = unitImages
          .split(",")
          .map((u) => u.trim())
          .filter((u) => u);
      } else if (unitImages && Array.isArray(unitImages)) {
        parsedUnitImages = unitImages;
      }

      if (!unit) {
        project.units.push({
          id: crypto.randomUUID(),
          name: unitName,
          area: unitArea > 0 ? `${unitArea} m²` : "",
          rooms: unitRooms,
          location: unitLocation,
          price: unitPrice || "",
          payment: unitPayment || "Cash",
          delivery: unitDelivery || "Immediate",
          status: unitStatus,
          img: parsedUnitImages.length > 0 ? parsedUnitImages[0] : unitImg,
          images: parsedUnitImages,
          desc: unitDesc,
        });
      } else {
        unit.area = unitArea > 0 ? `${unitArea} m²` : unit.area;
        unit.rooms = unitRooms;
        unit.location = unitLocation || unit.location;
        unit.price = unitPrice || unit.price;
        unit.payment = unitPayment || unit.payment;
        unit.delivery = unitDelivery || unit.delivery;
        unit.status = unitStatus || unit.status;
        if (parsedUnitImages.length > 0) {
          unit.img = parsedUnitImages[0];
          unit.images = parsedUnitImages;
        }
        unit.desc = unitDesc || unit.desc;
      }
    } else {
      console.warn(
        `Project "${projectName}" not found for unit "${unitName}". Unit not added. Please ensure project exists in 'Projects' sheet.`
      );
    }
  });
}

// ====== Init render ======
renderProjects({ limit: FEATURED_PROJECTS_LIMIT });
updateSummaryMetrics();

// معاينة صورة المشروع
document
  .getElementById("projectImgFile")
  .addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("projectImgPreview");
    const imgUrlInput = document.getElementById("projectImg");
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        imgUrlInput.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

document.getElementById("projectImg").addEventListener("input", function () {
  const val = this.value;
  const preview = document.getElementById("projectImgPreview");
  if (val.startsWith("data:image")) {
    preview.src = val;
    preview.style.display = "block";
  } else if (val.startsWith("http") || val.startsWith("https")) {
    preview.src = val;
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
    preview.src = "/placeholder.svg";
  }
});

// The function to update employee deal count with revenue tracking
function updateEmployeeDealCount(employeeId, propertyPrice = null) {
  const employees = JSON.parse(localStorage.getItem("employeesData")) || [];

  const employee = employees.find((e) => e.id === employeeId);
  if (employee) {
    employee.deals = (employee.deals || 0) + 1;

    if (propertyPrice) {
      const priceValue = parseInt(propertyPrice.replace(/[^0-9]/g, "")) || 0;
      employee.revenue = (employee.revenue || 0) + priceValue;
    }

    localStorage.setItem("employeesData", JSON.stringify(employees));
    console.log(
      `Updated ${employee.name}: ${employee.deals} deals, $${employee.revenue} revenue`
    );
  }
}

function addNotification(type, title, text) {
  const notif = {
    id: crypto.randomUUID(),
    type: type,
    title: title,
    text: text,
    timestamp: new Date().toISOString(),
    read: false,
  };
  const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
  notifs.unshift(notif);
  localStorage.setItem("notificationsData", JSON.stringify(notifs));
  console.log("[v0] Notification added:", notif);

  updateNotificationCounter();
}

function updateNotificationCounter() {
  const notifications =
    JSON.parse(localStorage.getItem("notificationsData")) || [];
  const unreadCount = notifications.filter((n) => !n.read).length;
  const counterElement = document.querySelector(".notification-counter");
  if (counterElement) {
    if (unreadCount > 0) {
      counterElement.textContent = unreadCount;
      counterElement.style.display = "block";
    } else {
      counterElement.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", updateNotificationCounter);
