import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../src/photo/WhatsApp Image 2023-08-23 at 23.58.55.jpg";
import back1 from "../src/photo/clear.jpg"
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import { CloudCircle, CloudCircleOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

//translation
import { useTranslation } from "react-i18next";

import moment from "moment/moment";
//to convert date & time Arabic
import "moment/min/locales";
// moment.locale("ar");

//to CleanUp Effect 1
let cancelAxios = null;
export default function Test() {
  //to search city
  const [city, setCity] = useState("");
  console.log(city);
  const [loading, setLoading] = useState(false);

  //translation
  const { t, i18n } = useTranslation();

  //moment(1)
  const [dateTime, setDateTime] = useState("");
  //use state to git all value from api request
  const [temp, setTemp] = useState({
    Number: null,
    description: "",
    min: null,
    max: null,
    wind: null,
    icon: null,
  });

  //handleLanguage========
  const [locale, setLocale] = useState("en");
  const handleLanguage = () => {
    if (locale == "ar") {
      setLocale("en");
      i18n.changeLanguage("en"); //put any code of language
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar"); //put any code of language
      moment.locale("ar");
    }
    setDateTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  };

  //url
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  const apiKey = `8f290fc5a4843f62f82b12a36dd599f6`;

  useEffect(() => {
    i18n.changeLanguage(locale);
    //moment(2)
    setDateTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    axios
      .get(baseUrl + `&appid=${apiKey}`, {
        //to CleanUp Effect 2
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      })
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responceIcon = response.data.weather[0].icon;
        const wind = response.data.wind.speed;
        console.log(responceIcon);
        //call fun. to get value
        setTemp({
          Number: responseTemp,
          min: min,
          max: max,
          description: description,
          wind: wind,
          icon: `https://openweathermap.org/img/wn/${responceIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {        
      });
    //to CleanUp Effect 3
    return () => {
      cancelAxios();
    };
  }, [city]);
  console.log(city);

  // background changer
  // function  backChanger()  {
  //   if(temp.description == 'clear sky') {
  //     document.body.style.backgroundColor = "red"
  //   }else if(temp.description == 'overcast clouds'){
  //     document.body.style.backgroundColor = "blue"
  //   }
  // };

  return (
    <>
      <Container
        // to change direction
        dir={locale == "ar" ? "rtl" : "ltr"}
        sx={{ minHeight: "100vh" }}
        maxWidth="sm"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center ",
        }}
      >
        <Card
        className="alaa"
          sx={{
            minWidth: 345,
            boxShadow: (theme) => theme.shadows[5],
          }}
        >
          <CardMedia sx={{ height: 340 }} image={logo} title="green iguana" />
          <hr />
          {/* search */}
          <div>
            <TextField
              value={city}
              onChange={(city) => setCity(city.target.value)}
              // onKeyUp={backChanger}
              className="cityInput"
              id="filled-basic"
              label="City"
              variant="filled"
            />
          </div>
          {/* ===search=== */}

          <CardContent style={{ display: "flex" }}>
            {/* content */}
            <div>
              {/* city & time */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontFamily: "IMF" }}
                >
                  {dateTime}
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ fontFamily: "PtItalic" }}
                >
                  {t(city)}
                </Typography>
              </div>
              {/* ===city & time=== */}
              <hr />
              {/* degree & description */}
              <div style={{ display: "flex", margin: "2px" }}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ fontFamily: "PItalic" }}
                >
                  {temp.Number}
                </Typography>

                <div>
                  <Typography
                    style={{ margin: "5px" }}
                    variant="h6"
                    component="h5"
                  >
                    {t(temp.description)}
                  </Typography>
                  <Typography
                    style={{
                      margin: "3px",
                      fontFamily: "IMF",
                      fontSize: "20px",
                    }}
                    variant="h3"
                    component="h5"
                  >
                    {t("wind")}: {temp.wind}
                  </Typography>
                </div>
              </div>

              {/* min & max */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h6
                  style={{ margin: "3px", fontFamily: "IMF", fontSize: "20px" }}
                >
                  {t("max")}: {temp.max}
                </h6>
                <h6>|</h6>
                <h6
                  style={{ margin: "3px", fontFamily: "IMF", fontSize: "20px" }}
                >
                  {t("min")}: {temp.min}
                </h6>
              </div>
              {/* ===degree & description=== */}
            </div>
            <svg data-testid="CloudIcon"></svg>
            {/* ToDo Temp Img */}
            <div>
              <img className="imgIcon" src={temp.icon} />
            </div>
            {/* ====ToDo Temp Img==== */}
            <CloudCircleOutlined
              style={{ fontSize: "200", color: "blue" }}
            ></CloudCircleOutlined>

            {/* ===content=== */}
          </CardContent>
          <CardActions>
            <Button onClick={handleLanguage} size="small">
              {locale == "ar" ? "English" : "عربي"}
            </Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
