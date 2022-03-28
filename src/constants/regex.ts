export const NUMBER = /^[0-9]*$/g
export const DECIMAL_DITGITS = /(\.\d+)+/g
export const COMMA = /[,]/g
export const ENG = /^[a-zA-Z0-9]+$/g
export const LOWERCASE = /^[a-z0-9]+$/g
export const ESCAPED_TIMEZONE = /\S{1,19}/g
export const SPACE = /\s+/g
export const UNDERSCORE_DASH_SPACE = /[-_ ]/g
export const YOUTUBE_EMBED_ID = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/

// check if password contains at least 6 characters with one capital letter and one special character
export const CHECK_PASSWORD = /^(?=.*[A-Z])(?=.*[.*@$!%*?&#^()\-_+=<>])[A-Za-z\d.*@$!%*?&#^()\-_+=<>]{6,}$/g

export const NO_NUMBER_OR_SPECIAL_CHAR = /^[aA-zZก-๙\s]+$/
export const THAI_ENG = /^[aA-zZก-๙\s]+$/