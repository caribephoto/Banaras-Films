import React from "react";
import { useDocumentTitle, useTakeMeToTheTop } from "../hooks/hooks";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motions";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  Alert
} from "@mui/material";

const Terms = () => {
  useDocumentTitle("Terms & Conditions");
  useTakeMeToTheTop();

  return (
    <Box
      component={motion.div}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      sx={{ bgcolor: 'background.default', color: 'text.primary', py: 4 }}
    >
      <Box sx={{ textAlign: 'center', py: { xs: 6, lg: 8 } }}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="800"
          sx={{
            textTransform: 'uppercase',
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
            letterSpacing: 2
          }}
        >
          Terms and Conditions
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ pb: 10 }}>
        <Box sx={{ lineHeight: 2 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Very Important Notice:
            </Typography>
            <Typography variant="body2">
              Every communication, correspondence, offers, discounts or payments (PayPal) must be linked and/or related to @caribephoto.com domain.
            </Typography>
          </Alert>

          <Typography variant="body1" paragraph>
            <Typography component="span" fontWeight="bold">Hotel Fee (HF): </Typography>
            Some Hotels have a fee to allow external photographers into their properties. Please contact your hotel to confirm if a charge applies. If your wedding will take place at any Karisma hotels, that fee will be waived.
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
            Terms and conditions Photography and Video
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4, mb: 4 }}>
            <ListItem sx={{ display: 'list-item' }}>
              In high probabilities of bad weather (rain/storm/strong wind or other) Caribephoto reserves the right to cancel the use of the Photography or/and Video and the cost of the coverage will be refunded. If during the ceremony the weather changes suddenly the coverage will stop and the proportional cost will be refunded.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Our photographers have their own style and judgment, every special request must be asked for prior the Wedding at last 3 business days before and sent by email to info@caribephoto.com.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              RAW FILES: Must be requested by email prior the Wedding (3 business days before).
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              RAW FILES have an additional cost.
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
            LINK Delivery policy:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4, mb: 4 }}>
            <ListItem sx={{ display: 'list-item' }}>
              The sending of the virtual gallery will be 40 days after the wedding
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              The images to be retouched into your wedding book must be submitted ONLY via the virtual gallery we provide (spreadsheets, word documents or email messages{' '}
              <Typography component="span" color="error">WILL NOT BE ACCEPTED</Typography>). You have 4 weeks to review your images and send your selection from the virtual gallery. Please stick to the time frame, otherwise we will be forced to reschedule the final delivery of your wedding book with a considerable delay. We will confirm via email the receipt of your final selection corrected and complete to start process of your wedding book
            </ListItem>
          </List>

          <Alert severity="error" sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Terms and conditions Photography and Video
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 2 }}>
              <ListItem sx={{ display: 'list-item' }}>
                The delivery of the final product (Wedding Book) will be 4 to 6 weeks after we receive your final selection.
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                The wedding book will be delivered to the hotel where you stayed during your wedding. If you would like to have it delivered to your home address, the shipping cost will be quoted separately.
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                We will keep your images in our server for 1 year after your wedding date. After that time, we will delete them from our server.
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                Caribephoto reserves the right to use any images from your wedding for promotional purposes.
              </ListItem>
            </List>
          </Alert>

          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
            Payment Policy:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4, mb: 4 }}>
            <ListItem sx={{ display: 'list-item' }}>
              A 50% deposit is required to secure your wedding date.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              The remaining balance must be paid 30 days before your wedding date.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              All payments must be made via PayPal to ensure security and proper documentation.
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
            Cancellation Policy:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4, mb: 4 }}>
            <ListItem sx={{ display: 'list-item' }}>
              Cancellations made more than 60 days before the wedding date will receive a full refund minus a 10% administrative fee.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Cancellations made 30-60 days before the wedding date will receive a 50% refund.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Cancellations made less than 30 days before the wedding date are non-refundable.
            </ListItem>
          </List>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 6, fontStyle: 'italic' }}>
            By booking our services, you agree to these terms and conditions. If you have any questions, please contact us at info@caribephoto.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Terms;
