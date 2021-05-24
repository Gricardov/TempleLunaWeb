import ImgColaboracion from '../img/colaboracion.svg';
import ImgFoco from '../img/bulb.png';
import ImgLibro from '../img/books.svg';
import ImgMaquinaDeEscribir from '../img/typewriter.svg';
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

export const carrouselData = [
    { text: 'La editorial comunitaria que siempre habías esperado', buttonText: 'Únete al grupo', href: 'https://www.facebook.com/groups/1004324056570387', bg: 'radial-gradient(farthest-corner at 0px 100%, rgb(82 70 198) 10%, rgba(139, 129, 236, 1) 50%)', img: ImgColaboracion },
    { text: 'Gran curso de guión, texto y novela: Crea historias de calidad superior', buttonText: '¡Me interesa!', pushTo: 'ins_evento/OBRA-PROFESIONAL-CCADENA-2', bg: 'linear-gradient(to right, #000000, #434343)', img: ImgLibro, style: { bottom: '-50px', right: '-100px' } }
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