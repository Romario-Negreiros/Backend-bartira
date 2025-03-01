"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _supabasejs = require('@supabase/supabase-js');
var _userRoutes = require('../routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);


_dotenv2.default.config();

const app = _express2.default.call(void 0, );
const port = parseInt(process.env.PORT || "3000", 10);

// Configuração do Supabase
const supabaseUrl = `https://${process.env.SUPABASE_URL}.supabase.co`;
const supabaseKey = process.env.SUPABASE_KEY || "";

// Inicializando o cliente do Supabase diretamente aqui
const supabase = _supabasejs.createClient.call(void 0, supabaseUrl, supabaseKey);

app.use(_express2.default.json()); // Middleware para parsear JSON
app.use("/users", _userRoutes2.default); // Define o prefixo de rota para usuários

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exportando o cliente diretamente
exports. default = supabase;
