// import { useState, useRef, useEffect } from "react";
import Base from "./base";
import NavigationTabs from "./tabs";
import "echarts-wordcloud";
import EchartsWordCloud from "../components/EchartsWordCloud";

export default function WORDCLOUD() {

  return (
    <Base>
      <div className="custom-container">
        <div className="row">
          <div className="col-sm-12 pb-4 header">
            <div className="lineNavigContent"></div>
            <NavigationTabs />
            
          </div>
        </div>
        <div className="col-sm-12 mt-2 mb-2 g-2 container-chaild-cyrpd">
          <div className="row d-flex justify-content-center">
            вашт параметры
            <div className="col-sm-12 mt-3 mb-3 g-3 blockrpdVerified">
              <EchartsWordCloud />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
