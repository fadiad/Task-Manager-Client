const USER_REGEX = /^[a-zA-Z0-9]([_.-](?![_.-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
const FULL_NAME_REGEX = /^[a-zA-Z]+ [a-zA-Z]+$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20}$/
const EMAIL_REGEX = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;


export const regexObj = {
  fullName: FULL_NAME_REGEX,
  user: USER_REGEX,
  pwd: PWD_REGEX,
  email: EMAIL_REGEX,
  matchPwd: PWD_REGEX
}

const USERNAME_HINT = (<span>5 to 24 characters.<br />
  Must begin with a letter and end with a letter<br />
  Letters, numbers, underscores, hyphens and dot are allowed.</span>);

const PASS_HINT = (<span>8 to 24 characters.<br />
  Must include uppercase and lowercase letters, a number and a special character.<br />
  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></span>)

const EMAIL_HINT = <span>Email format: example@domain.com</span>

const FULLNAME_HINT = <span>Full name: recommened that first name starts <br />with uppercase
  and only letters also last name is only letters</span>

const MATCH_PASS_HINT = <span>Must match the first password input field.</span>
export const hints = {
  fullName: FULLNAME_HINT,
  user: USERNAME_HINT,
  pwd: PASS_HINT,
  email: EMAIL_HINT,
  matchPwd: MATCH_PASS_HINT
}

export const itemsTypes = [
  'TASK',
  'BUG',
  'SUBTASK',
  'TESTING',
]
export const notificationsTypes = [
  'ITEM_ASSIGNED_TO_ME',
  'ITEM_STATUS_CHANGED',
  'ITEM_COMMENT_ADDED',
  'ITEM_DELETED',
  'ITEM_DATA_CHANGED',
  'USER_ADDED_TO_THE_SYSTEM',
]

export const notificationsWay = [
  'EMAIL',
  'POP_UP',
]

export const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (!date) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  return day + " " + month;
};

export const colorsList = {
  'BUG': "#a8193d",
  'TASK': "#4fcc25",
  'SUBTASK': "#1ebffa",
  'TESTING': "#8da377"
};

