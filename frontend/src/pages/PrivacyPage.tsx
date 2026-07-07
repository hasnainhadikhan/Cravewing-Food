import LegalPage from "./LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 7, 2026"
      intro="CraveWing (“we,” “us,” “our”) respects your privacy. This policy explains what information we collect when you use our website and services, how we use it, and the choices you have. By using CraveWing, you agree to the practices described here."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "Information you provide directly — such as your name, email address, phone number, delivery address, and order details when you create an account, place an order, or contact us.",
            "Information collected automatically — such as device type, browser, IP address, and usage data gathered through cookies and similar technologies to help the site function and improve.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "To process and deliver your orders, manage your account, and provide customer support.",
            "To send you order updates, and — only if you opt in — marketing emails about new sauces, deals, and promotions. You can unsubscribe at any time.",
            "To secure our services, prevent fraud, and comply with legal obligations.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use cookies to remember your cart, keep you signed in, and understand how the site is used. You can control cookies through your browser settings, though some features may not work without them.",
          ],
        },
        {
          heading: "Sharing Your Information",
          body: [
            "We do not sell your personal information. We share it only with trusted service providers (such as payment processors and delivery partners) who help us operate, and only as needed to provide our services or as required by law.",
          ],
        },
        {
          heading: "Data Security & Retention",
          body: [
            "We use reasonable technical and organizational measures to protect your information, and retain it only as long as necessary for the purposes described here or as required by law.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            "Depending on where you live, you may have the right to access, correct, or delete your personal information, or to opt out of marketing. Contact us to exercise these rights.",
          ],
        },
        {
          heading: "Changes to This Policy",
          body: [
            "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date above. Continued use of CraveWing after changes means you accept the updated policy.",
          ],
        },
      ]}
    />
  );
}
