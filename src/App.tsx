import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    evento: "",
    data: "",
    local: "",
    cliente: "",
    email: "",
  });

  const handleClick = () => inputFileRef.current?.click();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const gerarIngresso = () => {
    navigate("/ingresso", { state: { data: formData, avatar: preview } });
  };

  return (
    <div className="bg-[url(./src/assets/img/background-mobile.png)] bg-center bg-cover w-full h-full">
        
  
      <div className="flex  justify-center items-center pt-10 p-5 gap-3">
        <div className="flex gap-1 relative">
        <img src="./src/assets/img/logo-mark.svg" alt="logo" />
        <h1 className="text-stone-50 font-bold text-2xl">Gerador de Ingresso</h1>
         
         </div>
         <img className=" absolute w-30 left-70" src="src/assets/img/linhacurva.svg" alt=""/>
      </div>

     
      <div className="w-[80%] m-auto mt-2">
        <p className="mb-2 text-[14px] text-stone-50">
          Preencha os campos abaixo e envie uma foto para gerar seu ingresso personalizado.
        </p>
        <p className="mb-8 text-[14px] text-stone-50/50">
          Após preencher todos os dados, clique em "Gerar Ingresso" para visualizar e baixar.
        </p>
      </div>

   
      <div
        onClick={handleClick}
        className="flex flex-col justify-center items-center bg-stone-50/10 w-[80%] rounded-xl h-30 m-auto gap-3 cursor-pointer hover:scale-102 border-3 border-dashed border-stone-50/20"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
        ) : (
          <>
            <img className="w-10 h-10 bg-stone-50/10 rounded-lg" src="./src/assets/img/icon-upload.svg" alt="" />
            <p className="text-stone-50/30 text-center">Clique aqui e faça o Upload da sua Foto</p>
          </>
        )}
      </div>

      <input
        type="file"
        ref={inputFileRef}
        onChange={handleChangeFile}
        className="hidden"
        accept="image/*"
      />

   
      <div className="flex flex-col gap-1 w-[80%] m-auto mt-10">
        <label className="text-stone-50 text-xs">Nome do Evento</label>
        <input
          name="evento"
          value={formData.evento}
          className="bg-stone-50/10 text-sm h-8 border border-stone-50/20 pl-2 text-white rounded-sm"
          type="text"
          placeholder="Digite aqui"
          onChange={handleChangeInput}
        />
      </div>

      <div className="flex flex-col gap-1 w-[80%] m-auto mt-4">
        <label className="text-stone-50 text-xs">Data do evento</label>
        <input
          name="data"
          value={formData.data}
          className="bg-stone-50/10 text-sm h-8 border border-stone-50/20 pl-2 text-white rounded-sm"
          type="text"
          placeholder="xx/xx/xxxx"
          onChange={handleChangeInput}
        />
      </div>

      <div className="flex flex-col gap-1 w-[80%] m-auto mt-4">
        <label className="text-stone-50 text-xs">Local do evento</label>
        <input
          name="local"
          value={formData.local}
          className="bg-stone-50/10 text-sm h-8 border border-stone-50/20 pl-2 text-white rounded-sm"
          type="text"
          placeholder="Copacabana, RJ"
          onChange={handleChangeInput}
        />
      </div>

      <div className="flex flex-col gap-1 w-[80%] m-auto mt-4">
        <label className="text-stone-50 text-xs">Nome do Cliente</label>
        <input
          name="cliente"
          value={formData.cliente}
          className="bg-stone-50/10 text-sm h-8 border border-stone-50/20 pl-2 text-white rounded-sm"
          type="text"
          placeholder="Nome e sobrenome"
          onChange={handleChangeInput}
        />
      </div>

      <div className="flex flex-col gap-1 w-[80%] m-auto mt-4 pb-8">
        <label className="text-stone-50 text-xs">E-mail do Cliente</label>
        <input
          name="email"
          value={formData.email}
          className="bg-stone-50/10 text-sm h-8 border border-stone-50/20 pl-2 text-white rounded-sm"
          type="text"
          placeholder="Nome completo"
          onChange={handleChangeInput}
        />
      </div>

    
      <div className="flex justify-center items-center ">
        <button
          onClick={gerarIngresso}
          className="bg-red-400 text-slate-900 rounded-lg p-2 w-40 cursor-pointer hover:scale-102 shadow-xl"
        >
          Gerar Ingresso
        </button>
      </div>
      <img className="" src="src/assets/img/arcos.svg" alt=""/>
    </div>
    
  );
}

export default App;
