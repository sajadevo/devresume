// @components
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-black mb-2">
        Privacy Policy
      </h2>
      <p className="leading-7">Last updated on February 10, 2025</p>
      <div className="mt-12 max-w-2xl text-foreground">
        <p className="leading-7">
          Welcome to DevResume. Your privacy is important to us, and this
          Privacy Policy explains how we collect, use, and protect your
          information when you use our platform. By accessing or using our
          service, you agree to this Privacy Policy. If you do not agree, please
          refrain from using our platform.
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Information We Collect
        </h3>
        <p className="leading-7 mb-4">
          We collect information to provide our services and improve your
          experience.
        </p>
        <ul className="list-disc pl-5">
          <li className="leading-7">
            <strong className="text-black font-medium">
              Public GitHub Data:
            </strong>{" "}
            When you use our platform, we access publicly available data from
            your GitHub profile, including your name, username, bio, profile
            picture, public repositories, and contributions.
          </li>
          <li className="leading-7">
            <strong className="text-black font-medium">Usage Data:</strong> We
            collect information about how you interact with our platform, such
            as your IP address, browser type, and device details.
          </li>
        </ul>
        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          How We Use Your Information
        </h3>
        <p className="leading-7 mb-4">We use the data we collect to:</p>
        <ul className="list-disc pl-5">
          <li className="leading-7">
            Generate resumes from your public GitHub data.
          </li>
          <li className="leading-7">
            Improve the functionality and user experience of our platform.
          </li>
          <li className="leading-7">
            Monitor platform performance and security.
          </li>
        </ul>
        <p className="leading-7 my-4">
          We do not sell your information to third parties.
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Sharing Your Information
        </h3>
        <p className="leading-7 mb-4">
          By creating a resume on DevResume, the data from your public GitHub
          profile used to generate the resume may be shared publicly.
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Data Retention
        </h3>
        <p className="leading-7 mb-4">
          We retain your data only as long as necessary to provide our services.
          If you delete your resume or account, we will delete your data
          permanently.
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Data Security
        </h3>
        <p className="leading-7 mb-4">
          We use industry-standard practices to secure your data. While we
          strive to protect your information, no method of electronic storage is
          entirely secure.
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Your Rights
        </h3>
        <p className="leading-7 mb-4">You have rights regarding your data:</p>
        <ul className="list-disc pl-5">
          <li className="leading-7">Request access to your data.</li>
          <li className="leading-7">Ask us to correct or delete your data.</li>
          <li className="leading-7">
            Opt out of certain data collection practices, such as analytics.
          </li>
        </ul>
        <p className="leading-7 my-4">
          To exercise these rights, contact{" "}
          <Link
            href="mailto:sajadevvo@gmail.com"
            className="text-black hover:text-primary font-medium transition-colors duration-300"
          >
            Sajad
          </Link>
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Third-Party Links
        </h3>
        <p className="leading-7 mb-4">
          Our platform may include links to third-party websites. We are not
          responsible for their privacy practices. Review their privacy policies
          before sharing your data.
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Updates to This Privacy Policy
        </h3>
        <p className="leading-7 mb-4">
          We may update this policy to reflect changes in our practices or legal
          requirements. Significant updates will be communicated through our
          platform.
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-black mb-2 mt-8">
          Contact Us
        </h3>
        <p className="leading-7 mb-4">
          If you have questions or concerns about this Privacy Policy, contact{" "}
          <Link
            href="mailto:sajadevvo@gmail.com"
            className="text-black hover:text-primary font-medium transition-colors duration-300"
          >
            Sajad
          </Link>
        </p>
      </div>
    </div>
  );
}
