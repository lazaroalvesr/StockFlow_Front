import { LinkRedirect } from "../lib/linkRedirect"

export const Main = () => {
    return (
        <section className="w-full m-auto flex items-center lg:mt-28 mt-20 flex-col">
            <div className="text-center lg:w-[1100px] md:w-[800px] w-96  items-center justify-center flex-col flex m-auto">
                <h1 className="font-extrabold text-[25px] lg:text-[44px] md:text-[40px] pb-8 text-[#454545]">Gestão Eficiente de Estoque para Estruturar Seu Negócio de Verdade</h1>
                <p className="lg:text-lg lg:mb-20 mb-12 md:text-lg font-light text-sm"> Stockflow é um sistema de gestão que permite organizar e registrar seu estoque diretamente pelo celular, tablet ou computador, proporcionando muito mais agilidade e organização para a sua loja.</p>
            </div>
            <LinkRedirect href="/auth/login">
            <button className="bg-[#0019F9] text-white px-20 py-3 rounded-md">
                Comece agora
            </button>
            </LinkRedirect>
        </section>
    )
}