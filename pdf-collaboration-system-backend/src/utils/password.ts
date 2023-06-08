import { compareSync, genSaltSync, hashSync } from 'bcryptjs';


export const comparePassword = (password: string, hashedPassword: string) => {
   return compareSync(password, hashedPassword);
}

export const hashPassword = (password: string) => {
    const salt = genSaltSync();

    const hashedPassword = hashSync(password, salt);

    return hashedPassword;
}
