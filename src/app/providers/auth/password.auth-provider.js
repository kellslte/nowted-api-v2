import argon from 'argon2'

export const hashPassword = async (password) => await argon.hash(password);

export const verifyPassword = async (password, hash) => await argon.verify(hash, password);