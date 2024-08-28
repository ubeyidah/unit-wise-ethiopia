const Privacy = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Privacy and Cookie Statement
        </h1>
        <p className="mb-6">
          At Unit Wise Ethiopia, we respect your privacy and are committed to
          protecting your personal data. This statement outlines how we handle
          your information when you use our platform.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide to us
            when you register on the platform, authenticate with Google,
            subscribe to a plan, or communicate with us. This information may
            include your name, email address, study preferences, and any other
            details you provide.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <p>The information we collect is used to:</p>
          <ul className="list-disc pl-6">
            <li>Provide and personalize your experience on the platform.</li>
            <li>Process your payments and subscriptions.</li>
            <li>
              Send you important notifications and updates about your account.
            </li>
            <li>Analyze usage to improve our services and the platform.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data from unauthorized access, alteration,
            disclosure, or destruction. However, please be aware that no method
            of internet transmission or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            4. Cookies and Tracking Technologies
          </h2>
          <p>
            Our platform uses cookies and similar tracking technologies to
            enhance your experience and analyze how you use our services.
            Cookies are small data files stored on your device that help us
            remember your preferences and improve our site's functionality.
          </p>
          <p>
            You can control the use of cookies through your browser settings.
            However, disabling cookies may affect the functionality of the
            platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            5. Sharing Your Information
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service
            providers who assist us in operating the platform, as long as those
            parties agree to keep this information confidential.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information at any time. You can manage your account settings or
            contact us directly at{" "}
            <a
              href="mailto:unitwiseethiopia@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              unitwiseethiopia@gmail.com
            </a>{" "}
            for assistance.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            7. Changes to This Statement
          </h2>
          <p>
            We may update this Privacy and Cookie Statement from time to time.
            Any changes will be posted on this page, and your continued use of
            the platform constitutes acceptance of those changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy and Cookie Statement,
            please contact us at{" "}
            <a
              href="mailto:unitwiseethiopia@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              unitwiseethiopia@gmail.com
            </a>
            .
          </p>
        </section>

        <footer className="text-center mt-12">
          <p>
            &copy; {new Date().getFullYear()} Unit Wise Ethiopia. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Privacy;
