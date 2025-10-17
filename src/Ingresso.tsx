import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


import logoMark from "./assets/img/logo-mark.svg";
import patternTicket from "./assets/img/pattern-ticket.svg";

interface IngressoProps {
  data: {
    evento: string;
    data: string;
    local: string;
    cliente: string;
    email: string;
  };
  avatar: string | null;
}

function Ingresso() {
  const location = useLocation();
  const state = location.state as IngressoProps | undefined;

  if (!state)
    return <div className="text-white p-10">Dados do ingresso não encontrados!</div>;

  const { data, avatar } = state;
  const codigoIngresso = Math.random().toString(36).substring(2, 8).toUpperCase();

  const gerarPDF = async () => {
    const element = document.getElementById("ingresso-ticket");
    if (!element) return;

    const imgs = element.getElementsByTagName("img");
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve(true);
            else img.onload = () => resolve(true);
          })
      )
    );

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#1e1e1e",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`ingresso_${codigoIngresso}.pdf`);
  };

  return (
    <div
      className="bg-center bg-cover w-screen h-screen pt-20 lg:h-screen  "
      style={{ backgroundImage: `url(/background-mobile.png)` }} 
    >
      <div className="flex justify-center items-center pt-10 p-5 gap-3">
        <img className="w-5 h-5" src={logoMark} alt="logo" />
        <h1 className="text-stone-50 font-bold text-xl sm:text-4xl  ">Gerador de Ingresso</h1>
      </div>

      <div className="flex flex-col w-[90%] m-auto justify-center items-center gap-5">
        <h2 className="text-stone-50 text-center text-xl">
          Parabéns,{" "}
          <span className="bg-gradient-to-r from-red-400/80 via-purple-400 to-red-300/80 bg-clip-text text-transparent font-bold text-xl">
            {data.cliente},
          </span>{" "}
          seu Ingresso está pronto!
        </h2>
        <h3 className="text-stone-50 text-center text-sm sm:text-lg">
          Print a <span className="text-red-300/90 font-semibold">Tela</span> para salvar em seu dispositivo
        </h3>
      </div>

      <div
        id="ingresso-ticket"
        onClick={gerarPDF}
        className="flex justify-center items-center pt-8 relative cursor-pointer active:scale-95 transition-transform duration-150"
      >
        <img
          src="/background-mobile.png"
          alt="bg"
          className="absolute w-full h-full top-0 left-0 -z-10 opacity-0"
        />
        <img className="w-[80%] max-w-[500px]" src={patternTicket} alt="Ticket" />


          <div>
          <div className="absolute top-12 left-43 transform -translate-x-1/2 text-center text-stone-50 sm:left-105 sm:top-18 md:left-95 lg:left-135 xl:left-170 ">
          <h1 className="text-xl font-bold sm:text-2xl md:text-4xl ">{data.evento}</h1>
          <div className="flex gap-2 text-stone-50/60 text-[10px] pt-1 justify-center md:text-[14px]">
            <p>{data.data}</p>
            <p>/</p>
            <p>{data.local}</p>
          </div>
        </div>
        

      
        <div className="flex gap-2 absolute top-29 left-1/2 w-[57%] transform -translate-x-1/2 text-stone-50 items-center sm:left-145 sm:top-40 md:left-130 md:top-42 lg:left-195 xl:left-245">
          {avatar && (
            <img className="w-12 h-12 rounded-lg object-cover" src={avatar} alt="avatar" />
          )}
          <div>
            <h1 className="font-semibold md:text-xl">{data.cliente}</h1>
            <p className="text-stone-50/60 text-[10px] sm:text-[14px]">{data.email}</p>
          </div>
        </div>

</div>

         
          


        <div className="absolute text-stone-50/50 left-[73%] text-center rotate-270 lg:left-190 lg:text-[20px] xl:left-220">
          {codigoIngresso}
        </div>
      </div>
    </div>
  );
}

export default Ingresso;
