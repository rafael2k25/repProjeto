CREATE DATABASE BancoIFTT;
go
use BancoIFTT;
go

CREATE TABLE Aviso (
    id_aviso int identity PRIMARY KEY,
    titulo varchar(150),
    descricao varchar(1000),
    imagem varchar(255),
    data_publicacao DATE,
    fk_Usuario_id_usuario int
);

CREATE TABLE Usuario (
    id_usuario int  identity  PRIMARY KEY,
    nome varchar(100),
    cargo varchar(50),
    avatar varchar(255),
    email varchar(100),
    senha varchar(100),
    tema_pag varchar(20)
);

CREATE TABLE Canal (
    nome_canal varchar(50),
    id_canal int  identity  PRIMARY KEY
);

CREATE TABLE Comunicacao_Mensagem (
    texto varchar(100),
    id_mensagem int  identity PRIMARY KEY,
    id_hora DATE,
    fk_Usuario_id_usuario int,
    fk_Canal_id_canal int
);
 
ALTER TABLE Aviso ADD CONSTRAINT FK_Aviso_2
    FOREIGN KEY (fk_Usuario_id_usuario)
    REFERENCES Usuario (id_usuario)
    ON DELETE CASCADE;
 
ALTER TABLE Comunicacao_Mensagem ADD CONSTRAINT FK_Comunicacao_Mensagem_2
    FOREIGN KEY (fk_Usuario_id_usuario)
    REFERENCES Usuario (id_usuario);
 
ALTER TABLE Comunicacao_Mensagem ADD CONSTRAINT FK_Comunicacao_Mensagem_3
    FOREIGN KEY (fk_Canal_id_canal)
    REFERENCES Canal (id_canal);

	USE BancoIFTT;
GO

/* =========================
   USUÁRIOS
========================= */

INSERT INTO Usuario
(nome, cargo, avatar, email, senha, tema_pag)
VALUES
('Rafael Vasconcelos', 'Diretor', 'avatar1.png', 'rafael@iftt.com', '123456', 'escuro'),

('Marina Costa', 'Coordenadora', 'avatar2.png', 'marina@iftt.com', '123456', 'claro'),

('Lucas Almeida', 'Professor', 'avatar3.png', 'lucas@iftt.com', '123456', 'escuro'),

('Fernanda Lima', 'Secretária', 'avatar4.png', 'fernanda@iftt.com', '123456', 'claro'),

('Carlos Henrique', 'Administrador', 'avatar5.png', 'carlos@iftt.com', '123456', 'escuro');



/* =========================
   CANAIS
========================= */

INSERT INTO Canal
(nome_canal)
VALUES
('Comunicados Gerais'),

('Professores'),

('Secretaria'),

('Eventos'),

('TI Interno');



/* =========================
   AVISOS
========================= */

INSERT INTO Aviso
(titulo, descricao, imagem, data_publicacao, fk_Usuario_id_usuario)
VALUES
(
'Reunião Pedagógica',
'Reunião geral com todos os professores na sala principal às 14h.',
'reuniao.jpg',
'2026-05-20',
1
),

(
'Atualização do Sistema',
'O sistema interno ficará indisponível das 22h até meia-noite para manutenção.',
'manutencao.jpg',
'2026-05-22',
5
),

(
'Semana de Tecnologia',
'Evento de tecnologia com palestras e minicursos aberto aos alunos.',
'evento-tech.jpg',
'2026-05-25',
2
),

(
'Entrega de Documentos',
'Os alunos devem entregar a documentação pendente até sexta-feira.',
'documentos.jpg',
'2026-05-26',
4
),

(
'Novo Laboratório',
'O laboratório 3 foi liberado para uso nas aulas práticas.',
'laboratorio.jpg',
'2026-05-28',
3
);



/* =========================
   MENSAGENS
========================= */

INSERT INTO Comunicacao_Mensagem
(texto, id_hora, fk_Usuario_id_usuario, fk_Canal_id_canal)
VALUES
(
'Bom dia pessoal, a reunião começa em 15 minutos.',
'2026-05-20',
1,
1
),

(
'Os computadores do laboratório já foram atualizados.',
'2026-05-21',
5,
5
),

(
'Alguém pode substituir minha aula de sexta?',
'2026-05-22',
3,
2
),

(
'Os certificados do evento já estão disponíveis.',
'2026-05-24',
2,
4
),

(
'A secretaria funcionará até às 18h hoje.',
'2026-05-25',
4,
3
);