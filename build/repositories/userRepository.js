"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _server = require('../server'); var _server2 = _interopRequireDefault(_server); // Importação do cliente Supabase diretamente
 // Sugestão: criar um tipo `User` para os dados do usuário

// Função para criar um novo usuário no Supabase
 const createUser = async (
    userData
) => {
    try {
        // Agora, o cliente do Supabase já está disponível diretamente
        const { data, error } = await _server2.default.from("users").insert([
            {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: userData.role,
            },
        ]);

        return { data, error };
    } catch (error) {
        return { data: null, error: error.message };
    }
}; exports.createUser = createUser;

 const getUserByEmail = async (email) => {
    try {
        const { data, error } = await _server2.default
            .from("users")
            .select("id, email, password, role") // Seleciona os campos necessários
            .eq("email", email)
            .single(); // Garante que retorna apenas um usuário

        return { data, error };
    } catch (error) {
        return { data: null, error: error.message };
    }
}; exports.getUserByEmail = getUserByEmail;
