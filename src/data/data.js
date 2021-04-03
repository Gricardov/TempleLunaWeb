import ImgColaboracion from '../img/colaboracion.svg';

export const carrouselData = [
    { text: 'Primer concurso de cuentos de terror', buttonText: 'Participa', href: 'https://www.facebook.com/groups/1004324056570387', bg: 'radial-gradient(farthest-corner at 0 100%,rgb(0 0 1) 10%,#211b51 50%)', img: ImgColaboracion, orientation: 'right' },
    { text: 'Portadas y críticas a tu medida', buttonText: 'Pide la tuya', href: 'https://www.facebook.com/groups/1004324056570387', bg: '#32c5bf', img: ImgColaboracion, orientation: 'right' },
    { text: 'Empieza a ser admirado por tu forma de escribir', buttonText: 'Únete al grupo', href: 'https://www.facebook.com/groups/1004324056570387', bg: 'radial-gradient(farthest-corner at 0px 100%, rgb(82 70 198) 10%, rgba(139, 129, 236, 1) 50%)', img: ImgColaboracion }
]

export const critiquePoints = [{ id: 'INTENCION', name: 'Transmisión de mi intención', abrev: '¿Se entiende lo que quiero transmitir?' }, { id: 'ENGANCHE', name: 'Enganche de mi obra', abrev: '¿Qué tanto engancha mi obra?' }, { id: 'ORTOGRAFIA', name: 'Ortografía', abrev: '¿Qué tal es la ortografía?' }];
export const designTypes = [{ type: 'CR', icon: 'fas fa-burn', text: 'Cuenta regresiva', tag: 'Nuevo', displayInDropdown: false }, { type: 'POR', icon: 'fas fa-book', text: 'Portada de libro' }, { type: 'BAN', icon: 'far fa-window-restore', text: 'Banner para post' }];
export const contactTypes = [{ type: 'WSP', icon: 'fab fa-whatsapp', name: 'Whatsapp' }, { type: 'TLG', icon: 'fab fa-telegram', name: 'Telegram' }];

export const requestTypes = [{ type: 'DISENO', icon: 'fas fa-paint-brush', text: 'Diseños' }, { type: 'CRITICA', icon: 'fas fa-glasses', text: 'Críticas' }];
export const requestStatuses = [{ id: 'DISPONIBLE', name: 'Nuevos', statistics: 0 }, { id: 'TOMADO', name: 'Elegidos', statistics: 0 }, { id: 'HECHO', name: 'Listos', statistics: 0 }];

export const contributors = ['@Gricardov', '@JennyAline', '@CaroDePearolMorales', '@AlphaPhantom', '@JackDreamer', '@PiccolaScrittrice', '@SayraBaylon', '@JuliLorenzi'];