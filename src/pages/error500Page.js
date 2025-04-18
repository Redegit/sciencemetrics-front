import Base from "./base";

export default function Error500() {
  return (
    <Base>
      <div className="custom-container">
        <div className="conteier-error">
          <div className="error500-container">
            <div className="error500">
              <h1>5</h1>
              <div className="gear zero">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              <h1 className="textNull">0</h1>
            </div>

            <h2 className="textOne">Что-то пошло не так.. :(</h2>
            <p className="textTwo">
              Мы уже работаем над решением, скоро все будет в порядке!
            </p>

            <div className="gears">
              <div className="gear one">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              <div className="gear two">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:700");
          @import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");

          :root {
            --ghost-color: #528cce;
            --heading-color: #e7ebf2;
            --bg-color: #4a545d;
            --stroke-color: #adb8cc;
            --accent-color: #4d5e80;
          }

          .custom-container {
            padding: 1px;
          }

          .conteier-error {
            border-radius: 15px;
            background: var(--bg-color);
            font-family: "Montserrat", sans-serif;
            margin: 0;
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100vh;
            justify-content: center;
            align-items: center;
            text-align: center;
            overflow: hidden;
            padding: 10px;
          }

          .error500-container {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .error500 {
            text-align: center;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          h1 {
            color: var(--heading-color);
            font-size: 14.5rem;
            letter-spacing: 0.1em;
            margin: 0.025em 0;
            text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
            white-space: nowrap;
            font-weight: 900;
          }

          .textOne {
            color: var(--heading-color);
            margin-bottom: 0.4em;
            z-index: 20;
            font-weight: 900;
          }

          .textTwo {
            color: #ccc;
            margin-top: 0;
          }

          .textNull {
            margin-left: 20px;
          }

          .gear.zero {
            display: inline-block;
            width: 120px;
            height: 120px;
            margin-left: 10px;
            border-radius: 50%;
            background: var(--stroke-color);
            position: relative;
            animation: rotateGear 6s linear infinite;
          }

          .gear.zero:before {
            position: absolute;
            left: 5px;
            top: 5px;
            right: 5px;
            bottom: 5px;
            z-index: 2;
            content: "";
            border-radius: 50%;
            background: var(#4a545d);
          }

          .gear.zero:after {
            position: absolute;
            left: 25px;
            top: 25px;
            z-index: 3;
            content: "";
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 5px solid var(--stroke-color);
            box-sizing: border-box;
            background: var(--bg-color);
          }

          .gears {
            position: absolute;
            top: 55vh;
            margin-left: 790px;
            transform: rotate(290deg);
            transform-origin: top left;
          }

          .gear {
            position: relative;
            z-index: 0;
            width: 120px;
            height: 120px;
            margin: 0 auto;
            border-radius: 50%;
            background: var(--stroke-color);
          }

          .gear:before {
            position: absolute;
            left: 5px;
            top: 5px;
            right: 5px;
            bottom: 5px;
            z-index: 2;
            content: "";
            border-radius: 50%;
            background: var(--bg-color);
          }

          .gear:after {
            position: absolute;
            left: 25px;
            top: 25px;
            z-index: 3;
            content: "";
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 5px solid var(--stroke-color);
            box-sizing: border-box;
            background: var(--bg-color);
          }

          .gear.one {
            left: -130px;
            animation: anticlockwiseErrorStop 2s linear infinite;
          }

          .gear.two {
            top: -75px;
            animation: anticlockwiseError 2s linear infinite;
          }

          .gear .bar {
            position: absolute;
            left: -15px;
            top: 50%;
            z-index: 0;
            width: 150px;
            height: 30px;
            margin-top: -15px;
            border-radius: 5px;
            background: var(--stroke-color);
          }

          .gear .bar:before {
            position: absolute;
            left: 5px;
            top: 5px;
            right: 5px;
            bottom: 5px;
            z-index: 1;
            content: "";
            border-radius: 2px;
            background: var(--bg-color);
          }

          .gear .bar:nth-child(2) {
            transform: rotate(60deg);
          }

          .gear .bar:nth-child(3) {
            transform: rotate(120deg);
          }

          @keyframes clockwiseError {
            0% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(30deg);
            }
            40% {
              transform: rotate(25deg);
            }
            60% {
              transform: rotate(30deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes anticlockwiseErrorStop {
            0% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(-30deg);
            }
            60% {
              transform: rotate(-30deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes anticlockwiseError {
            0% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(-30deg);
            }
            40% {
              transform: rotate(-25deg);
            }
            60% {
              transform: rotate(-30deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes rotateGear {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 1233px) {
            .gears {
              position: absolute;
              top: 68vh;
              margin-left: 90px;
              transform: rotate(-20deg);
              transform-origin: top left;
            }
            h1 {
              font-size: 8.5rem;
            }
          }

          @media (max-width: 500px) {
            h1 {
              font-size: 7.5rem;
            }
          }
        `}</style>
      </div>
    </Base>
  );
}
