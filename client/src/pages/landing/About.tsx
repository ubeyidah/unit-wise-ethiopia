const About = () => {
  return (
    <section className="container px-4 py-11">
      <h1 className="text-3xl mb-7">
        About <span className="text-green-400">Us</span>
      </h1>
      <div>
        <h1 className="text-xl mb-4 relative w-fit">
          Our <span className="text-green-400">Story</span>
          <div className="absolute w-10 h-1 bg-green-500 -right-4"></div>
        </h1>
        <p className="mb-3">
          Unit Wise Ethiopia began with a vision sparked by a student's personal
          experience. As a dedicated student facing the complexities of exam
          preparation, Ubeyid Oumer noticed a significant gap in the available
          tools and resources. The existing solutions were either too generic or
          didn't cater specifically to the needs of Ethiopian students,
          especially when dealing with both the old and new curriculums.
        </p>
        <p className="mb-3">
          Driven by a desire to improve this situation, Ubeyid Oumer embarked on
          a mission to create a platform that would make exam preparation more
          structured and effective. The idea was simple but ambitious: to
          develop a comprehensive web application that organizes study
          materials, tracks progress, and provides valuable insights tailored to
          the Ethiopian educational system.
        </p>
        <p className="mb-3">
          Starting from scratch, the journey involved extensive research,
          development, and countless iterations. The platform was designed not
          just as a tool, but as a companion to guide students through their
          academic journey. With features like a structured curriculum, topic
          management, and progress tracking, Unit Wise Ethiopia aims to be more
          than just a study aid—it's a solution crafted by a student for
          students, with a deep understanding of the real challenges they face.
        </p>
        <p className="mb-7">
          Today, Unit Wise Ethiopia stands as a testament to the power of
          innovation and dedication. From its humble beginnings, it has evolved
          into a vital resource for students across Ethiopia, offering a
          tailored approach to exam preparation and helping them achieve their
          academic goals more efficiently.
        </p>
      </div>
      <div>
        <h1 className="text-xl mb-4 relative w-fit">
          Our <span className="text-green-400">Mission</span>
          <div className="absolute w-10 h-1 bg-green-500 -right-4"></div>
        </h1>
        <p className="mb-7">
          At Unit Wise Ethiopia, our mission is to revolutionize how students
          prepare for their exams. We provide a comprehensive platform designed
          to streamline study efforts, making preparation more organized,
          efficient, and effective. Our goal is to empower students with the
          right tools and resources to excel in their academic journey.
        </p>
      </div>
      <div>
        <h1 className="text-xl mb-4 relative w-fit">
          Our <span className="text-green-400">Vision</span>
          <div className="absolute w-10 h-1 bg-green-500 -right-4"></div>
        </h1>
        <p className="mb-7">
          We envision becoming Ethiopia's leading educational platform, driving
          innovation in exam preparation. Our focus is on creating a
          user-friendly experience that helps students achieve their academic
          goals through cutting-edge technology and personalized study aids.
        </p>
      </div>

      <div>
        <h1 className="text-xl mb-4 relative w-fit">
          Meet the <span className="text-green-400">Team</span>
          <div className="absolute w-10 h-1 bg-green-500 -right-4"></div>
        </h1>
        <h3 className="mb-3">
          <span className="text-green-400 ">Ubeyid Oumer</span> Founder and
          Developer of Unit Wise Ethiopia(UWE)
        </h3>
        <p className="mb-7">
          A dedicated student and passionate coder, Ubeyid Oumer launched Unit
          Wise Ethiopia to tackle the real challenges faced by students in
          preparing for exams. With a deep understanding of these challenges,
          Ubeyid Oumer is committed to making study preparation more accessible
          and effective for all.
        </p>
      </div>
      <div>
        <h1 className="text-xl mb-4 relative w-fit">
          Get in <span className="text-green-400">Touch</span>
          <div className="absolute w-10 h-1 bg-green-500 -right-4"></div>
        </h1>
        <p>
          Have questions or want to learn more about Unit Wise Ethiopia? We’d
          love to hear from you! Feel free to
          <a
            href="mailto:unitwiseethiopia@gmail.com"
            target="_blank"
            className="text-blue-700 cursor-pointer mx-2"
          >
            contact us (unitwiseethiopia@gmail.com)
          </a>
          and let’s discuss how we can support your academic journey.
        </p>
      </div>
    </section>
  );
};

export default About;
