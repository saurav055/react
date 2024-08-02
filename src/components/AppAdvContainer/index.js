import { Typography } from "@mui/material";
import { Box, Image, styled } from "@mui/system";
import { GooglePlay, Kundli, LoshuGrid } from "assets";
import * as React from "react";
import styles from "./AppAdvContainer.module.css";

const GradientDiv = styled("div")(({ theme }) => ({
  backgroundImage: theme.palette.primary.mainGradient,
}));

function AppAdvContainer(params) {
  return (
    <GradientDiv
      sx={{
        width: "90%",
        marginX: "auto",
        height: { mobile: "30%", laptop: "40%" },
        flexDirection: { laptop: "row", mobile: "column" },
        display: "flex",
        padding: { laptop: "3em", mobile: "1em" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: "1em", laptop: "1.2em" },
            width: "40%",
            marginY: "1em",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Horoscope Chart
        </Typography>

        <Box
          component="img"
          sx={{
            maxHeight: "80%",
            maxWidth: "80%",
            height: "15em",
          }}
          alt="The house from the offer."
          src={Kundli}
        />
      </Box>
      <Box
        sx={{
          flex: 1.7,
          display: "flex",
          flexDirection: "column",
          paddingY: "1em",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "900",
              fontSize: { laptop: "1.1em", mobile: "1em", tablet: "0.7em" },
              textAlign: "center",
            }}
          >
            To chat with our Astrologers, please Download the App now!
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: { mobile: 80, mobile: 70, laptop: 100 },
            }}
            alt="google Play Store"
            src={GooglePlay}
          ></Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
            paddingY: { mobile: "2px", latop: "1px" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "2%",
              borderRight: 1,
              borderColor: "primary.contrastText",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: ".6em", laptop: "1.2em" },
                textAlign: "center",
              }}
            >
              100% <br /> security
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "2%",
              borderRight: 1,
              borderColor: "primary.contrastText",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: ".6em", laptop: "1.2em" },
                textAlign: "center",
              }}
            >
              World's Top Astrologer's
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "2%",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: ".6em", laptop: "1.2em" },
                textAlign: "center",
              }}
            >
              Solution To Problems
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: { mobile: "1em", laptop: "1.2em" },
            width: "40%",
            marginY: "1em",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Customized Vastu &{"\n"}Numerology
        </Typography>

        <Box
          component="img"
          sx={{
            maxHeight: { mobile: "60%", laptop: "80%" },
            maxWidth: { mobile: "60%", laptop: "80%" },
            height: "15em",
          }}
          alt="The house from the offer."
          src={LoshuGrid}
        />
      </Box>
    </GradientDiv>
  );
}
export default AppAdvContainer;
