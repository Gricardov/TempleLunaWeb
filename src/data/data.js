import ImgColaboracion from '../img/colaboracion.svg';
import ImgServCritica from '../img/ser-critica.svg';
import ImgServDiseno from '../img/ser-diseno.svg';
import ImgServCoreccion from '../img/ser-correccion.svg';
import ImgServBooktrailer from '../img/ser-bookt.svg';
import ImgServEntrevista from '../img/ser-entrev.svg';
import ImgServPromo from '../img/ser-promo.svg';
import ImgPrevCritica from '../img/pre-critica.png';
import ImgPrevDiseno from '../img/pre-diseno.png';
import ImgPrevCorreccion from '../img/pre-correccion.png';
import ImgPrevServicio from '../img/pre-servicio.png';
import ImgLeyendo from '../img/sitting-reading.svg';
import ImgEquipo from '../img/equipo.svg';

export const carrouselData = [
    { text: 'Concurso Cosmic Awards\n¡Desliza y conoce a los ganadores de cada categoría!', bg: `black`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2Fcosmic-awards-logo.jpg?alt=media&token=bf542f6e-a342-4e25-a415-7ce273dba0af', style: { transform: 'rotate(5deg)', top: '40%', right: '-50px' } },
    // Microrrelatos
    { text: '1° lugar de microrrelato:\nCumbre 2065', orientation: 'right', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/282745843', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(78 11 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2Fcosmic-awards-logo.jpg?alt=media&token=bf542f6e-a342-4e25-a415-7ce273dba0af', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },
    { text: '2° lugar de microrrelato:\nMemorias de un muerto', orientation: 'right', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/277196457', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(11 87 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2F2nd-place-ca.jpg?alt=media&token=6c8bac73-2fc4-4d1b-af85-090a49f2c555', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },
    { text: '3° lugar de microrrelato:\nEl gato de al lado', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/275083787', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(154 251 255) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2F3rd-place-ca.jpg?alt=media&token=ab78dd0c-b53f-4f6b-bcb5-7ea4f0603501', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },
    // Relatos
    { text: '1° lugar de relato:\nLa lápida en blanco', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/277191112', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(78 11 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2Fcosmic-awards-logo.jpg?alt=media&token=bf542f6e-a342-4e25-a415-7ce273dba0af', style: { transform: 'rotate(343deg)', width:'250px',height:'250px', top: '40%', right: '20px' } },
    { text: '2° lugar de relato:\nImpacto colosal', orientation: 'right', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/269687097', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(11 87 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2F2nd-place-ca.jpg?alt=media&token=6c8bac73-2fc4-4d1b-af85-090a49f2c555', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },
    // Novelas
    { text: '1° lugar de novela:\nSemper Vigilant', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/258230946', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(78 11 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2Fcosmic-awards-logo.jpg?alt=media&token=bf542f6e-a342-4e25-a415-7ce273dba0af', style: { transform: 'rotate(343deg)', width:'250px',height:'250px', top: '40%', right: '20px' } },
    { text: '2° lugar de novela:\nGeorgia', orientation: 'right', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/269551207', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(11 87 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2F2nd-place-ca.jpg?alt=media&token=6c8bac73-2fc4-4d1b-af85-090a49f2c555', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },
    { text: '3° lugar de novela:\nBastardo', orientation: 'right', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/245067747', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(11 87 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2F3rd-place-ca.jpg?alt=media&token=ab78dd0c-b53f-4f6b-bcb5-7ea4f0603501', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },
    // Poesías
    { text: '1° lugar de poesía:\nQuisiera ser todo para ti', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/976679343', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(78 11 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2Fcosmic-awards-logo.jpg?alt=media&token=bf542f6e-a342-4e25-a415-7ce273dba0af', style: { transform: 'rotate(343deg)', width:'250px',height:'250px', top: '40%', right: '20px' } },
    // One shots
    { text: '1° lugar de One Shot:\nNadie, tu robot de compañía', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/105937641', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(78 11 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2Fcosmic-awards-logo.jpg?alt=media&token=bf542f6e-a342-4e25-a415-7ce273dba0af', style: { transform: 'rotate(343deg)', width:'250px',height:'250px', top: '40%', right: '20px' } },
    { text: '3° lugar de One Shot:\nLa magia entre el amor y la muerte', orientation: 'right', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/276508620', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(11 87 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2F3rd-place-ca.jpg?alt=media&token=ab78dd0c-b53f-4f6b-bcb5-7ea4f0603501', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },
    // Historias cortas
    { text: '1° lugar de historia corta:\nThe Autarchicals', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/1100304389', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(78 11 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2Fcosmic-awards-logo.jpg?alt=media&token=bf542f6e-a342-4e25-a415-7ce273dba0af', style: { transform: 'rotate(343deg)', width:'250px',height:'250px', top: '40%', right: '20px' } },
    { text: '2° lugar de historia corta:\nSangre nóckut - Arco 2: Alan y Vony...', orientation: 'right', buttonText: 'Leela aquí', href: 'https://www.wattpad.com/story/245527001', bg: `linear-gradient(140deg, rgb(0 0 0) 15%, rgb(11 87 195) 100%)`, img: 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/miscelanea%2F2nd-place-ca.jpg?alt=media&token=6c8bac73-2fc4-4d1b-af85-090a49f2c555', style: { transform: 'rotate(343deg)', width: '250px', height: '250px', top: '40%', right: '20px' } },

    { text: '¡El momento ha llegado!\nGran inauguración de Temple Luna', buttonText: 'Inscríbete aquí', pushTo: 'ins_evento/GRAN-INAUGURACION-TL', bg: `linear-gradient(135deg, rgb(41 19 70) 10%, rgb(17 28 102) 100%)`, img: ImgEquipo, style: { transform: 'rotate(5deg)', top: '35%', right: '-50px' } },
    { text: '¿Amas leer?\n¡Llegó la comunidad de lectura en vivo!', buttonText: 'Inscríbete aquí', pushTo: 'ins_evento/GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1', bg: `linear-gradient(135deg, rgb(0 0 0) 10%, rgb(44 44 44) 100%)`, img: ImgLeyendo, style: { bottom: '-20px', right: '-100px' } },
    { text: 'La editorial comunitaria que siempre habías esperado', buttonText: 'Únete al grupo', href: 'https://www.facebook.com/groups/1004324056570387', bg: 'radial-gradient(farthest-corner at 0px 100%, rgb(82 70 198) 10%, rgba(139, 129, 236, 1) 50%)', img: ImgColaboracion },
    //{ text: 'Gran curso de guión, texto y novela: Crea historias de calidad superior', buttonText: '¡Me interesa!', pushTo: 'ins_evento/OBRA-PROFESIONAL-CCADENA-2', bg: 'linear-gradient(to right, #000000, #434343)', img: ImgLibro, style: { bottom: '-50px', right: '-100px' } }
]

export const critiquePoints = [{ id: 'INTENCION', name: 'Transmisión de mi intención', abrev: '¿Se entiende lo que quiero transmitir?' }, { id: 'ENGANCHE', name: 'Enganche de mi obra', abrev: '¿Qué tanto engancha mi obra?' }, { id: 'ORTOGRAFIA', name: 'Ortografía', abrev: '¿Qué tal fue mi ortografía?' }];

export const correctionPoints = [{ id: 'ORTOGRAFIA', name: 'Ortografía', abrev: 'Ortografía' }];

export const designTypes = [{ type: 'CR', icon: 'fas fa-burn', name: 'Cuenta regresiva', tag: 'Nuevo', displayInDropdown: false }, { type: 'POR', icon: 'fas fa-book', name: 'Portada de libro' }, { type: 'BAN-WSP', icon: 'fab fa-whatsapp', name: 'Estado de Whatsapp', tag: 'Nuevo' }, { type: 'BAN-FB', icon: 'fab fa-facebook', name: 'Banner para Facebook' }, { type: 'BAN-INS', icon: 'fab fa-instagram', name: 'Banner para Instagram' }, { type: 'BAN-WTT', icon: 'fas fa-book-open', name: 'Banner para Wattpad' }, { type: 'BAN', icon: 'far fa-window-restore', name: 'Banner para post', displayInDropdown: false }];

export const contactTypes = [{ type: 'WSP', icon: 'fab fa-whatsapp', name: 'Whatsapp' }, { type: 'TLG', icon: 'fab fa-telegram', name: 'Telegram' }];

export const requestStatuses = [{ id: 'DISPONIBLE', name: 'Nuevos', statistics: 0 }, { id: 'TOMADO', name: 'Tomados', statistics: 0 }, { id: 'HECHO', name: 'Listos', statistics: 0 }];

export const contributors = ['@Gricardov', '@OsitaLectora1', '@CaroDePearolMorales', '@Marylundhautor', '@LuzCespedesMartinez', '@Irisadk94', '@JackDreamer', '@PiccolaScrittrice', '@SayraBaylon', '@Alkaiid', '@TristeMancebo', '@Gianna04G02DL', '@Soytatyautor'];

// Para los roles de las dinámicas
export const inscriptionTypes = [{ type: 'AUD', icon: 'fas fa-users', name: 'Audiencia' }, { type: 'AUT', icon: 'fas fa-pencil-alt', name: 'Autor', displayInDropdown: false }];

// Para los servicios que pueden brindar las personas y editoriales
export const editorialServices = [{ id: 'CRITICA', name: 'Críticas', editorialImg: ImgServCritica, prevImg: ImgPrevCritica, color: '#F8FFD5', icon: 'far fa-lightbulb' }, { id: 'DISENO', name: 'Diseños', editorialImg: ImgServDiseno, prevImg: ImgPrevDiseno, color: '#FFF0D5', icon: 'fas fa-magic', }, { id: 'CORRECCION', name: 'Correcciones', editorialImg: ImgServCoreccion, prevImg: ImgPrevCorreccion, color: '#D5F8FF', icon: 'fas fa-tasks', }, { id: 'ENTREVISTA', name: 'Entrevistas', editorialImg: ImgServEntrevista, prevImg: ImgPrevServicio, color: '#C7D7FF' }, { id: 'BOOKTRAILER', name: 'Booktrailers', editorialImg: ImgServBooktrailer, prevImg: ImgPrevServicio, color: '#E1DEFF' }, { id: 'DIFUSION', name: 'Difusión', editorialImg: ImgServPromo, prevImg: ImgPrevServicio, color: '#CFFFE2' }];

// Para las pestañas de las pestañas de editoriales
export const editorialTabs = [{ id: 'SERV', name: 'Servicios' }, { id: 'MIEM', name: 'Miembros' }, { id: 'ACER', name: 'Acerca de' }];

// Para los roles que pueden desempeñar los usuarios
export const userRoles = [{ id: 'FOUN-E', name: 'Fundador(a) de su editorial' }, { id: 'COLAB', name: 'Colaborador(a) de editorial' }, { id: 'CREA-TL', name: 'Creador de Temple Luna' }, { id: 'MOD-TL', name: 'Moderador de Temple Luna' }, { id: 'SUP-CRITICA', name: 'Supervisor(a) de críticas' }, { id: 'SUP-CORRECCION', name: 'Supervisor(a) de correcciones' }, { id: 'SUP-DISENO', name: 'Supervisor(a) de diseños' }];