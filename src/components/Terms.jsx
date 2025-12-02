import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useDocumentTitle, useTakeMeToTheTop } from "./hooks/hooks";
import { motion } from "framer-motion";
import { staggerContainer } from "./data/motions";

const Terms = () => {
  useDocumentTitle("Terms & Conditions");
  useTakeMeToTheTop();

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="text-gray-600 bg-white dark:bg-[#0b1121] dark:text-white font-[Poppins] pt-3 lg:pt-[14px]"
      >
        <div className="headline text-4xl md:text-5xl lg:text-7xl text-center pt-12 pb-0  px-12 lg:pt-10 lg:pb-0 lg:px-10 tracking-widest ">
          <h1 className="uppercase font-extrabold">Terms and Conditions</h1>
        </div>

        <section className="pb-10">
          <div className="container mx-auto">
            <div className="wrapper flex flex-col justify-center items-center w-lg:3/4 w-full mx-auto text-left leading-8">
              <p className=" mb-4">
                <span className="text-red-500 font-extrabold">
                  {" "}
                  Very Important Notice:
                </span>{" "}
                <p className="text-red-500 mb-4">
                  Every communication, correspondence, offers, discounts or
                  payments (PayPal) must be linked and/or related to
                  @caribephoto.com domain.
                </p>
                {"  "}
                <span className="font-extrabold"> Hotel Fee (HF): </span>
                <p className="mb-4">
                  Some Hotels have a fee to allow external photographers into
                  their properties. Please contact your hotel to confirm if a
                  charge applies. If your wedding will take place at any Karisma
                  hotels, that fee will be waived.
                </p>
                <p className="font-extrabold">
                  Terms and conditions Photography and Video
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>
                    In high probabilities of bad weather (rain/storm/strong wind
                    or other) Caribephoto reserves the right to cancel the use
                    of the Photography or/and Video and the cost of the coverage
                    will be refunded. If during the ceremony the weather changes
                    suddenly the coverage will stop and the proportional cost
                    will be refunded.
                  </li>
                  <li>
                    Our photographers have their own style and judgment, every
                    special request must be asked for prior the Wedding at last
                    3 business days before and sent by email to
                    info@caribephoto.com.
                  </li>
                  <li>
                    RAW FILES: Must be requested by email prior the Wedding (3
                    business days before).
                  </li>
                  <li>RAW FILES have an additional cost. </li>
                </ul>
              </p>
              <p className="text-base">
                <span className="font-extrabold"> LINK Delivery policy: </span>
                <ul className=" list-disc p-5 mb-4">
                  <li>
                    {" "}
                    The sending of the virtual gallery will be 40 days after the
                    wedding
                  </li>
                  <li>
                    The images to be retouched into your wedding book must be
                    submitted ONLY via the virtual gallery we provide
                    (spreadsheets, word documents or email messages{" "}
                    <span className="text-red-500">WILL NOT BE ACCEPTED)</span>.
                    You have 4 weeks to review your images and send your
                    selection from the virtual gallery. Please stick to the time
                    frame, otherwise we will be forced to reschedule the final
                    delivery of your wedding book with a considerable delay. We
                    will confirm via email the receipt of your final selection
                    corrected and complete to start process of your wedding book
                  </li>
                </ul>
              </p>

              <p>
                <p className="mb-4l">
                  <span className="text-red-500">
                    Terms and conditions Photography and Video
                  </span>
                  <ul className="list-disc p-5">
                    <li>
                      {" "}
                      In high probabilities of bad weather (rain/storm/strong
                      wind or other) Caribephoto reserves the right to cancel
                      the use of the Photography or/and Video and the cost of
                      the coverage will be refunded. If during the ceremony the
                      weather changes suddenly the coverage will stop and the
                      proportional cost will be refunded.
                    </li>
                    <li>
                      Songs will be requested by email to complete the Edition.{" "}
                    </li>
                    <li>
                      Video will be sent between 20 -30 business days after the
                      receipt of the songs via courier to an address of your
                      choice.
                    </li>
                    <li>
                      Shipping to Canada, North America and Caribbean Islands
                      $55.00 USD*
                    </li>
                    <li> Europe an U.K. $70.00 USD*</li>
                    <li>For any other countries please contact us *</li>
                    <li>Taxes not included.</li>
                  </ul>
                </p>
              </p>
              <p className="mb-4">
                <span className="font-extrabold">Photo sessions:</span>
                <p>
                  Price only valid in Mexico. For Dominican Republic and Jamaica
                  prices please contact info@caribephoto.com{" "}
                </p>
                <p> Does not apply for Weddings and Vow Renewals.</p>
                <span className="font-extrabold">Payments:</span>
                <p>
                  All the packages, additional services and waiting time periods
                  must be completely paid 24 hours before the event.
                </p>
                <span className="font-extrabold">Paypal Credit:</span>
                <ul className="list-disc p-5">
                  <li>
                    PayPal Credit is a PayPal service that gives you No Interest
                    if paid in full in 6 months.{" "}
                  </li>
                  <li>
                    {" "}
                    Valid for UK, USA & Germany. On purchases of $99 or more*.
                  </li>
                  <li>
                    *Subject to consumer credit approval, as determined by the
                    lender.
                  </li>
                </ul>
                <span className="font-extrabold">Cancellation policy: </span>
                <p>
                  For a complete refund the amount has to be requested within 45
                  days from the day of the transaction. After this time the
                  payment can be refunded only a 60 % . It will be necessary to
                  notify the cancellation 10 days before the Wedding. If you
                  would like to change the date of your wedding it will not have
                  an extra charge but it will be necessary to confirm the
                  availability 5 days before the event.
                </p>
                <span className="font-extrabold">Courtesy:</span>
                <p>
                  {" "}
                  We would appreciate your consideration to please provide a
                  meal and a non-alcoholic beverage to our photo/video staff if
                  your photography/video coverage time exceeds 5 hours. Prices
                  may change without notice.
                </p>
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Terms;
