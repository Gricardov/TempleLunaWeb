import ImgColaboracion from '../img/colaboracion.svg';
import ImgLecVivo from '../img/lec-vivo.svg';
import ImgFoco from '../img/bulb.png';
import ImgLibro from '../img/books.svg';

export const carrouselData = [
    //{ text: 'Gran lectura de obras en vivo, con Laydy Czulewyez', buttonText: 'Participar', pushTo: 'ins_evento/LECTURA-VIVO-LACZU-1', bg: 'radial-gradient(at 80% 100%, rgb(164 118 166) 10%, rgb(151 67 148) 50%)', img: ImgLecVivo, style: { bottom: '-50px', right: '-100px' } },
    { text: '¿Eres escritor? Aprende a construir tu novela como un profesional', buttonText: 'Inscribirme', pushTo: 'ins_evento/OBRA-PROFESIONAL-CCADENA-1', bg: 'rgb(152 37 37)', img: ImgLibro, style: { bottom: '-50px', right: '-100px' } },
    { text: 'Apaga la luz. Llegó la obra ganadora del concurso de terror', buttonText: 'Leer ahora', href: 'https://www.wattpad.com/story/263097960', bg: 'radial-gradient(at 300px 100%, rgb(0 0 0) 10%, rgb(46 46 46) 50%)', img: ImgFoco, orientation: 'right', style: { top: '50px', right: '-120px' } }, //scrollTo: 'critique-block'
    { text: 'La editorial comunitaria que siempre habías esperado', buttonText: 'Únete al grupo', href: 'https://www.facebook.com/groups/1004324056570387', bg: 'radial-gradient(farthest-corner at 0px 100%, rgb(82 70 198) 10%, rgba(139, 129, 236, 1) 50%)', img: ImgColaboracion }
]

export const critiquePoints = [{ id: 'INTENCION', name: 'Transmisión de mi intención', abrev: '¿Se entiende lo que quiero transmitir?' }, { id: 'ENGANCHE', name: 'Enganche de mi obra', abrev: '¿Qué tanto engancha mi obra?' }, { id: 'ORTOGRAFIA', name: 'Ortografía', abrev: '¿Qué tal es la ortografía?' }];
export const designTypes = [{ type: 'CR', icon: 'fas fa-burn', text: 'Cuenta regresiva', tag: 'Nuevo', displayInDropdown: false }, { type: 'POR', icon: 'fas fa-book', text: 'Portada de libro' }, { type: 'BAN-WSP', icon: 'fab fa-whatsapp', text: 'Estado de Whatsapp', tag: 'Nuevo' }, { type: 'BAN-FB', icon: 'fab fa-facebook', text: 'Banner para Facebook' }, { type: 'BAN-INS', icon: 'fab fa-instagram', text: 'Banner para Instagram' }, { type: 'BAN-WTT', icon: 'fas fa-book-open', text: 'Banner para Wattpad' }, { type: 'BAN', icon: 'far fa-window-restore', text: 'Banner para post', displayInDropdown: false }];
export const contactTypes = [{ type: 'WSP', icon: 'fab fa-whatsapp', name: 'Whatsapp' }, { type: 'TLG', icon: 'fab fa-telegram', name: 'Telegram' }];

export const requestTypes = [{ type: 'DISENO', icon: 'fas fa-magic', text: 'Diseños' }, { type: 'CRITICA', icon: 'far fa-lightbulb', text: 'Críticas' }];
export const requestStatuses = [{ id: 'DISPONIBLE', name: 'Nuevos', statistics: 0 }, { id: 'TOMADO', name: 'Elegidos', statistics: 0 }, { id: 'HECHO', name: 'Listos', statistics: 0 }];

export const contributors = ['@Gricardov', '@JennyAline', '@CaroDePearolMorales', '@AlphaPhantom', '@JackDreamer', '@PiccolaScrittrice', '@SayraBaylon', '@JuliLorenzi'];

// Para los roles de las dinámicas
export const inscriptionTypes = [{ type: 'AUD', icon: 'fas fa-users', text: 'Audiencia' }, { type: 'AUT', icon: 'fas fa-pencil-alt', text: 'Autor', displayInDropdown: false }];
