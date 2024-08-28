import { Link } from "react-router-dom";
import { webEmail } from "@/data/landing";

const Terms = () => {
  return (
    <main>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
          <p className="mb-6">
            Welcome to Unit Wise Ethiopia. By accessing or using our platform,
            you agree to be bound by the following terms and conditions. Please
            read them carefully.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By using our website and services, you agree to comply with and be
              bound by these Terms of Use. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              2. User Responsibilities
            </h2>
            <p>
              As a user, you agree to use Unit Wise Ethiopia for educational
              purposes only. You are responsible for maintaining the
              confidentiality of your account and any activities under your
              account.
            </p>
            <p>
              You must not misuse the platform, including but not limited to
              distributing viruses, spamming, or engaging in any activity that
              could harm the platform or its users.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              3. Content Ownership
            </h2>
            <p>
              All materials on Unit Wise Ethiopia, including but not limited to
              text, graphics, and code, are owned by unitwise ethiopia or its
              licensors and are protected by copyright and other intellectual
              property laws. You may not copy, distribute, or create derivative
              works from any content on this site without explicit permission.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              4. Payment and Subscription
            </h2>
            <p>
              If you choose to purchase a lifetime plan, payment must be made in
              Ethiopian Birr. All payments are non-refundable. Unit Wise
              Ethiopia reserves the right to modify the pricing and subscription
              models at any time.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">5. Privacy Policy</h2>
            <p>
              We value your privacy. Please refer to our{" "}
              <Link
                to="/privacy-policy"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Privacy Policy
              </Link>{" "}
              for more details on how we handle your personal information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to Unit
              Wise Ethiopia if you violate these Terms of Use. Upon termination,
              you must cease all use of the platform and destroy any copies of
              the materials you have obtained.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">7. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Any changes will be
              posted on this page, and your continued use of the platform
              constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              8. Contact Information
            </h2>
            <p>
              If you have any questions or concerns about these Terms of Use,
              please contact us at{" "}
              <a
                href={`mailto:${webEmail}`}
                className="text-blue-600 dark:text-blue-400 underline"
              >
                {webEmail}
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
    </main>
  );
};

export default Terms;
