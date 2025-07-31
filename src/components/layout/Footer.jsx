import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
} from "@mui/material";

const footerLinks = {
  Links: ["Testimonials", "FAQ", "Blog"],
  Legal: ["Privacy Policy", "Terms & Conditions"],
  Socials: ["x.com", "LinkedIn", "Instagram", "TikTok", "YouTube"],
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#111",
        color: "#fff",
        pt: 6,
        pb: 3,
        borderTop: "1px solid #333",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <Grid item xs={12} sm={4} md={3} key={section}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {section}
              </Typography>
              {items.map((item, index) => (
                <MuiLink
                  key={index}
                  href="#"
                  underline="hover"
                  sx={{
                    display: "block",
                    color: "#ccc",
                    fontSize: "0.95rem",
                    mb: 1,
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Grid>
          ))}

          {/* Logo */}
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            textAlign={{ xs: "center", md: "right" }}
          >
            <img
              src="/Favicon_icon2.png"
              alt="Taskify Logo"
              style={{
                width: 200,
                height: 200,
                borderRadius: 8,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
          </Grid>
        </Grid>

        {/* Copyright */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 6 }}
        >
          <Grid item>
            <Typography variant="body1" color="#aaa">
              © {new Date().getFullYear()} Taskify
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="#aaa">
              Designed by{" "}
              <MuiLink
                href="https://rajeevkumarsaw.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ color: "#ccc" }}
              >
                Rajeev Kumar Saw
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
