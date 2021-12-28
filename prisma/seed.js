const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function seed() {
  const Ema = await prisma.user.create({
    data: {
      username: "Ema",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getStartups().map((startup) => {
      const data = { userId: Ema.id, ...startup };
      return prisma.startup.create({ data });
    })
  );
}

seed();

function getStartups() {
  return [
    {
      name: "Queue",
      content: `Bridge the Innovation Divide.
        Software innovation is
        divided into areas where solutions are overflowing and benefiting from them, and areas where software solutions do not yet exist and are being left behind in the times.
        
        This condition is called the innovation gap = innovation divide.
        
        Our aim is to work with the innovators of our partner companies in these areas to solve problems in these areas that are being left behind.`,
    },
    {
      name: "zig-zag",
      content: `Zig-zag runs “WorldShopping”, a service that enables Japanese E-Commerce sites to sell their products internationally. To start selling to foreign customers, all a company has to do is inject a piece of JavaScript into their site. With support for over 1000 Japanese E-Commerce sites in industries like fashion, animation and hobbies, Zig-zag enjoys helping customers deliver their products all around the world.
  
        Their goal is to make worrying about borders a thing of the past and connect and support buyers and sellers to enable world-wide e-commerce through their service WorldShopping BIZ. By introducing WorldShopping BIZ into their site, Japanese E-Commerce brands can start selling to users in over 125 countries. It’s a way for people anywhere in the world to buy Japanese products safely and securely.
        
        Since its inception, Zig-zag has made major progress in breaking down walls that hampered cross-border E-Commerce. The solutions they’ve built use data and logistics knowhow and their patented technology to fundamentally improve the way purchase of Japanese goods from abroad happens.`,
    },
    {
      name: "Moon Creative Lab",
      content: `Moon Creative Lab is a human-centered venture studio that powers the creation of new businesses. Moon’s mission is to help Mitsui & Co, one of Japan’s largest organizations, in its pursuit to become a more future-forward, entrepreneurial company.
  
        We work to unlock the creativity of Mitsui’s 45,000 strong global workforce to build innovative businesses that will have an exponential impact on the world. We do this by bringing together the best talent in design, engineering, product and more to create bold new ventures from zero to launch.
        
        Moon transforms ideas into bold new ventures and provides the resources and expertise to light the way to a more creative future. We are human-centered in our approach and hands-on in our delivery. Our team of talented designers, engineers, product leaders and marketers help our idea owners connect with real users to create prototypes and MVPs and bring them to market quickly.`,
    },
    {
      name: "Moneytree",
      content: `Moneytree is a fin-tech start-up founded by three foreign entrepreneurs in Tokyo. Their Moneytree Link product provides a "utility layer for connecting financial services" that serves banks and other fin-tech companies, but they also have a popular consumer app that helps people manage their finances. They're a truly international company with an English-first environment and a high technical skill level for engineers, so it sounds like a really great place to work!`,
    },
    {
      name: "Drivemode",
      content: `Founded in 2013 by entrepreneurs from Zipcar and Tesla Motors, Drivemode is fundamentally changing vehicle technology for drivers – we enable smarter and safer connected driving in any vehicle.
  
        Drivemode has built a mobile-based connected vehicle platform which integrates directly with the vehicle to bring key communication and navigation features, while putting your vehicle’s data right at your fingertips. Our products are used by millions of riders and drivers in over 150 countries. In 2019 we were acquired by Honda as an independent subsidiary to integrate our platform directly into Honda vehicles around the world.`,
    },
    {
      name: "Omise",
      content: `At Omise, we believe that online payment is a necessity to develop a successful business on the internet. We provide our users with the necessary tools to run an online business, accept payments and connect them with millions of potential customers.
  
        Our payment solution is simple to setup and works seamlessly across multiple devices. We take care of connecting and maintaining relationships with processors and acquirers which let our users focus on building great products.`,
    },
    {
      name: "Japan Computer Vision",
      content: `Japan Computer Vision Corp. (JCV), a subsidiary company of SoftBank Corporation, is an AI startup that leverages SenseTime's image recognition technology to provide cutting-edge solutions for the "smart building" and "smart retail" sectors.
  
        We’ve seen tremendous growth with a 10X increase in revenue and scaling up to 110 employees just by our second year of operation. We operate like a Silicon Valley startup that’s in the middle of Tokyo.
        
        We have leaders in the company who have lived and worked for several years at startups and large corporations in the San Francisco Bay Area. Our team is also diverse from different parts of the world.`,
    },
  ];
}
