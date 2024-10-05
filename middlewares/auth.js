import jswebtoken from "jsonwebtoken";

export const generatetoken = (user) => {
    return jswebtoken.sign(
    {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    },
    process.env.PASSWORD,
    {
        expiresIn: "20m"
    }
    )
}

//Verificar autenticacion

export const isAuth = (req, res, next) => {
    const verified = req.headers.authorization;

    if (verified) {
        const isToken = verified.split(' ')[1]; 

        jswebtoken.verify(isToken, process.env.PASSWORD, (err, decoded) => {
            if (err) {
                console.error("Error al verificar el token:", err);
                return res.status(401).send({ message: "Token inválido" });
            }
            req.user = decoded; 
            next(); 
        });
    } else {
        return res.status(401).send({ message: "Token no enviado" });
    }
};
