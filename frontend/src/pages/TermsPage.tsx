import LegalPage from "./LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 7, 2026"
      intro="These Terms of Service (“Terms”) govern your use of the CraveWing website and services. By accessing our site or placing an order, you agree to these Terms. Please read them carefully."
      sections={[
        {
          heading: "Using Our Services",
          body: [
            "You must be able to form a binding contract to use CraveWing. You agree to provide accurate information and to use the site only for lawful purposes.",
            "You are responsible for keeping your account credentials secure and for all activity that happens under your account.",
          ],
        },
        {
          heading: "Orders & Pricing",
          body: [
            "All orders are subject to availability and acceptance. Prices, menu items, and promotions may change at any time without notice.",
            "We make every effort to display accurate pricing and product information, but errors may occur. If we discover an error affecting your order, we may cancel it and refund any amount charged.",
          ],
        },
        {
          heading: "Payments",
          body: [
            "Payment is processed at checkout through our third-party payment providers. By placing an order you authorize us to charge your selected payment method for the total shown, including taxes and applicable fees.",
          ],
        },
        {
          heading: "Cancellations & Refunds",
          body: [
            "Because food is prepared fresh, orders may not be cancellable once preparation begins. If something is wrong with your order, contact us promptly and we will make it right.",
          ],
        },
        {
          heading: "Intellectual Property",
          body: [
            "All content on this site — including the CraveWing name, logo, text, graphics, and imagery — is owned by or licensed to CraveWing and may not be used without our written permission.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "CraveWing is provided on an “as is” basis. To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising from your use of our services.",
          ],
        },
        {
          heading: "Changes to These Terms",
          body: [
            "We may update these Terms from time to time. Changes take effect when posted, and the “Last updated” date above will reflect the latest revision. Your continued use of CraveWing means you accept the updated Terms.",
          ],
        },
      ]}
    />
  );
}
