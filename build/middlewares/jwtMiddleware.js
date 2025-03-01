"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);


// Defina sua chave secreta (o ideal é usar variáveis de ambiente)
const SECRET_KEY = "sua_chave_secreta";

// Middleware para verificar o JWT

 const authenticateToken = (req, res, next) => {
    const token = _optionalChain([req, 'access', _ => _.header, 'call', _2 => _2("Authorization"), 'optionalAccess', _3 => _3.replace, 'call', _4 => _4("Bearer ", "")]);
  
    if (!token) {
      return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }
  
    try {
      // Verifica e decodifica o token
      const decoded = _jsonwebtoken2.default.verify(token, SECRET_KEY);
  
      // Adiciona os dados do usuário dentro de req.body
      req.body.user = decoded;
  
      next();
    } catch (err) {
      return res.status(403).json({ message: "Token inválido." });
    }
  }; exports.authenticateToken = authenticateToken;

 const generateToken = (userId) => {
    const SECRET_KEY = "sua_chave_secreta";
  
    const token = _jsonwebtoken2.default.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
  
    return token;
  }; exports.generateToken = generateToken;
