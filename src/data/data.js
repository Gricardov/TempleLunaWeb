import ImgColaboracion from '../img/colaboracion.svg';
import ImgMaquinaEscribir from '../img/typewriter.svg';
import ImgLectora from '../img/cami.svg';

export const carrouselData = [
    { text: 'Conoce a los ganadores del #CuentoCorto Temple Luna', buttonText: 'Ver lista', href: 'https://www.facebook.com/groups/templeluna/permalink/1426497294353059/', bg: 'radial-gradient(at 70% 100%, rgb(125 109 214) 10%, rgb(79, 67, 201) 50%)', img: ImgMaquinaEscribir, style: { bottom: '-20px' } },
    { text: 'Leyendo las mejores obras en vivo: Con Cami Orquera', buttonText: 'Quiero asistir', href: 'https://chat.whatsapp.com/FFuTtUO4J0KF0MEXpOdR4w', bg: 'rgb(42 95 148)', img: ImgLectora, orientation: 'right', style: { bottom: '-40px' } }, //scrollTo: 'critique-block'
    { text: 'Una editorial diferente, como nunca habías visto', buttonText: 'Únete al grupo', href: 'https://www.facebook.com/groups/1004324056570387', bg: 'radial-gradient(farthest-corner at 0px 100%, rgb(82 70 198) 10%, rgba(139, 129, 236, 1) 50%)', img: ImgColaboracion }
]

export const critiquePoints = [{ id: 'INTENCION', name: 'Transmisión de mi intención', abrev: '¿Se entiende lo que quiero transmitir?' }, { id: 'ENGANCHE', name: 'Enganche de mi obra', abrev: '¿Qué tanto engancha mi obra?' }, { id: 'ORTOGRAFIA', name: 'Ortografía', abrev: '¿Qué tal es la ortografía?' }];
export const designTypes = [{ type: 'CR', icon: 'fas fa-burn', text: 'Cuenta regresiva', tag: 'Nuevo', displayInDropdown: false }, { type: 'POR', icon: 'fas fa-book', text: 'Portada de libro' }, { type: 'BAN-WSP', icon: 'fab fa-whatsapp', text: 'Estado de Whatsapp', tag: 'Nuevo' }, { type: 'BAN-FB', icon: 'fab fa-facebook', text: 'Banner para Facebook' }, { type: 'BAN-INS', icon: 'fab fa-instagram', text: 'Banner para Instagram' }, { type: 'BAN-WTT', icon: 'fas fa-book-open', text: 'Banner para Wattpad' }, { type: 'BAN', icon: 'far fa-window-restore', text: 'Banner para post', displayInDropdown: false }];
export const contactTypes = [{ type: 'WSP', icon: 'fab fa-whatsapp', name: 'Whatsapp' }, { type: 'TLG', icon: 'fab fa-telegram', name: 'Telegram' }];

export const requestTypes = [{ type: 'DISENO', icon: 'fas fa-magic', text: 'Diseños' }, { type: 'CRITICA', icon: 'far fa-lightbulb', text: 'Críticas' }];
export const requestStatuses = [{ id: 'DISPONIBLE', name: 'Nuevos', statistics: 0 }, { id: 'TOMADO', name: 'Elegidos', statistics: 0 }, { id: 'HECHO', name: 'Listos', statistics: 0 }];

export const contributors = ['@Gricardov', '@JennyAline', '@CaroDePearolMorales', '@AlphaPhantom', '@JackDreamer', '@PiccolaScrittrice', '@SayraBaylon', '@JuliLorenzi'];