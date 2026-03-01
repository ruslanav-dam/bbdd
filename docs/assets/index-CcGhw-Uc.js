import{r as j,a as L,u as I,L as E,H as b,b as M,d as p,N as D}from"./react-vendor-yQqGJsKJ.js";import{S,s as f}from"./syntax-highlighter-ClWOu7oW.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function c(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=c(i);fetch(i.href,n)}})();var N={exports:{}},m={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var U=j,O=Symbol.for("react.element"),P=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,y=U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,B={key:!0,ref:!0,__self:!0,__source:!0};function R(a,s,c){var t,i={},n=null,u=null;c!==void 0&&(n=""+c),s.key!==void 0&&(n=""+s.key),s.ref!==void 0&&(u=s.ref);for(t in s)v.call(s,t)&&!B.hasOwnProperty(t)&&(i[t]=s[t]);if(a&&a.defaultProps)for(t in s=a.defaultProps,s)i[t]===void 0&&(i[t]=s[t]);return{$$typeof:O,type:a,key:n,ref:u,props:i,_owner:y.current}}m.Fragment=P;m.jsx=R;m.jsxs=R;N.exports=m;var e=N.exports,g,T=L;g=T.createRoot,T.hydrateRoot;const H={"/modul/1":[{id:"crear-bd",label:"Crear BD"},{id:"numerics",label:"Numèrics"},{id:"text",label:"Text"},{id:"data-hora",label:"Data/Hora"},{id:"altres",label:"Altres"},{id:"crear-taules",label:"Crear Taules"}],"/modul/2":[{id:"agregacio",label:"Agregació"},{id:"alias",label:"AS Àlies"},{id:"group-by",label:"GROUP BY"},{id:"distinct",label:"DISTINCT"},{id:"having",label:"HAVING"},{id:"order-by",label:"ORDER BY"}]};function F(a){var s;(s=document.getElementById(a))==null||s.scrollIntoView({behavior:"smooth",block:"start"})}function V(){const{pathname:a}=I(),s=H[a]||[];return e.jsxs("nav",{className:"navbar",children:[e.jsx("div",{className:"navbar-logo",children:e.jsx("img",{src:"/liveBBDD/lasalle_logo.JPG",alt:"La Salle Tarragona"})}),e.jsxs("div",{className:"navbar-modules",children:[e.jsx(E,{to:"/modul/1",className:`module-link ${a==="/modul/1"?"active":""}`,children:"Mòdul 1"}),e.jsx(E,{to:"/modul/2",className:`module-link ${a==="/modul/2"?"active":""}`,children:"Mòdul 2 ★"})]}),e.jsx("ul",{className:"navbar-sections",children:s.map(({id:c,label:t})=>e.jsx("li",{children:e.jsx("button",{onClick:()=>F(c),children:t})},c))})]})}function _(){return e.jsx("footer",{children:e.jsx("p",{children:"0484 Bases de Dades — La Salle Campus Tarragona · DAM 2025-2026"})})}function C({tag:a,title:s,subtitle:c}){return e.jsxs("header",{className:"page-header",children:[e.jsx("span",{className:"module-tag",children:a}),e.jsx("h1",{children:s}),e.jsx("p",{className:"subtitle",children:c})]})}S.registerLanguage("sql",f);const q={'pre[class*="language-"]':{background:"transparent",margin:0,padding:0},'code[class*="language-"]':{color:"#f0f0f5",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.8",textShadow:"none"},comment:{color:"#546e7a",fontStyle:"italic"},prolog:{color:"#546e7a"},doctype:{color:"#546e7a"},cdata:{color:"#546e7a"},punctuation:{color:"#89ddff"},keyword:{color:"#c792ea"},operator:{color:"#89ddff"},builtin:{color:"#82aaff"},function:{color:"#82aaff"},string:{color:"#c3e88d"},char:{color:"#c3e88d"},number:{color:"#f78c6c"},boolean:{color:"#f78c6c"},"class-name":{color:"#ffcb6b"},constant:{color:"#f78c6c"},variable:{color:"#f0f0f5"},tag:{color:"#f78c6c"},"attr-name":{color:"#82aaff"},"attr-value":{color:"#c3e88d"},property:{color:"#82aaff"},selector:{color:"#c3e88d"},important:{color:"#c792ea",fontWeight:"bold"},namespace:{opacity:.7},symbol:{color:"#f78c6c"},regex:{color:"#f78c6c"},inserted:{color:"#c3e88d"},deleted:{color:"#f78c6c"}};function r({label:a,code:s}){const[c,t]=j.useState(!1);function i(){navigator.clipboard.writeText(s).then(()=>{t(!0),setTimeout(()=>t(!1),2e3)})}return e.jsxs("div",{className:"code-block",children:[e.jsxs("div",{className:"code-header",children:[e.jsx("span",{className:"code-label",children:a}),e.jsx("button",{className:`copy-btn${c?" copied":""}`,onClick:i,children:c?"Copiat!":"Copiar"})]}),e.jsx("div",{className:"code-content",children:e.jsx(S,{language:"sql",style:q,PreTag:"div",customStyle:{background:"transparent",padding:0,margin:0},children:s})})]})}function l({type:a="info",title:s,children:c}){return e.jsxs("div",{className:`info-box ${a}`,children:[s&&e.jsx("div",{className:"info-box-title",children:s}),c]})}function x({headers:a,children:s}){return e.jsx("div",{className:"table-container",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsx("tr",{children:a.map((c,t)=>e.jsx("th",{children:c},t))})}),e.jsx("tbody",{children:s})]})})}function h({name:a,tag:s,rangeLabels:c,children:t}){return e.jsxs("div",{className:"type-card",children:[e.jsxs("div",{className:"type-card-header",children:[e.jsx("span",{className:"type-name",children:a}),s&&e.jsx("span",{className:"type-tag",children:s})]}),c&&e.jsxs("div",{className:"range-visual",children:[e.jsx("div",{className:"range-labels",children:c.map((i,n)=>e.jsx("span",{children:i},n))}),e.jsx("div",{className:"range-bar"})]}),t]})}function A({children:a}){return e.jsx("div",{className:"comparison-grid",children:a})}const d={crearBd:`-- Crear una nova base de dades
CREATE DATABASE botiga;

-- Seleccionar-la per treballar-hi
USE botiga;

-- Verificar que estem dins
SELECT DATABASE();`,sintaxiCreateDb:`CREATE DATABASE [IF NOT EXISTS] nom_base_dades
    [CHARACTER SET nom_charset]
    [COLLATE nom_collation];`,crearBdComplet:`CREATE DATABASE IF NOT EXISTS botiga
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;`,useBd:"USE botiga;",gestiobd:`-- Veure totes les BD del servidor
SHOW DATABASES;

-- Veure quina BD estem utilitzant
SELECT DATABASE();

-- Veure informació detallada d'una BD
SHOW CREATE DATABASE botiga;

-- Eliminar una BD (COMPTE! Elimina totes les dades)
DROP DATABASE botiga;

-- Eliminar només si existeix (evita errors)
DROP DATABASE IF EXISTS botiga;`,enters:`CREATE TABLE exemple_enters (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    edat          TINYINT UNSIGNED,       -- 0 a 255
    quantitat     SMALLINT,               -- -32,768 a 32,767
    codi_postal   MEDIUMINT UNSIGNED,     -- 0 a 16,777,215
    poblacio      INT,                    -- ±2,147 milions
    visites_web   BIGINT UNSIGNED         -- 0 a 18 trilions
);`,decimals:`CREATE TABLE exemple_decimals (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    preu            DECIMAL(10,2),        -- Exacte: 99999999.99
    pes_kg          DECIMAL(5,3),         -- Exacte: 99.999 kg
    temperatura     FLOAT,                -- Aproximat: 7 dígits
    coordenada_lat  DOUBLE,               -- Aproximat: 15 dígits
    percentatge     DECIMAL(5,2)          -- Exacte: 100.00%
);`,exempleDecimal:`DECIMAL(10,2)  -- 8 enters + 2 decimals = màxim 99999999.99
DECIMAL(5,2)   -- 3 enters + 2 decimals = màxim 999.99
DECIMAL(3,0)   -- 3 enters + 0 decimals = màxim 999 (equivalent a SMALLINT)
DECIMAL(6,4)   -- 2 enters + 4 decimals = màxim 99.9999`,floatError:`-- Prova això al Workbench per veure la diferència:
SELECT
    CAST(0.1 AS FLOAT) + CAST(0.2 AS FLOAT)         AS resultat_float,
    CAST(0.1 AS DECIMAL(10,2)) + CAST(0.2 AS DECIMAL(10,2)) AS resultat_decimal;`,text:`CREATE TABLE exemple_text (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    codi_pais       CHAR(2),            -- Sempre 2 caràcters: 'ES', 'FR'
    nif             CHAR(9),            -- Sempre 9 caràcters: '12345678A'
    nom             VARCHAR(50),        -- Fins a 50 caràcters
    email           VARCHAR(255),       -- Estàndard per emails
    descripcio      TEXT,               -- Textos llargs
    biografia       MEDIUMTEXT          -- Textos molt llargs
);`,dates:`CREATE TABLE exemple_dates (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    data_naixement      DATE,               -- '1990-05-15'
    hora_entrada        TIME,               -- '09:30:00'
    data_creacio        DATETIME,           -- '2024-01-15 14:30:00'
    ultima_modificacio  TIMESTAMP,          -- Auto-actualitza
    any_publicacio      YEAR                -- 2024
);`,timestampAuto:`CREATE TABLE productes (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    nom                 VARCHAR(100),
    -- Es posa automàticament quan s'insereix
    creat_el            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- S'actualitza automàticament quan es modifica el registre
    actualitzat_el      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,funcionsData:`-- Data i hora actuals
SELECT NOW();                   -- 2024-01-15 14:30:00
SELECT CURDATE();               -- 2024-01-15
SELECT CURTIME();               -- 14:30:00

-- Extreure parts d'una data
SELECT YEAR('2024-01-15');      -- 2024
SELECT MONTH('2024-01-15');     -- 1
SELECT DAY('2024-01-15');       -- 15

-- Calcular diferències
SELECT DATEDIFF('2024-12-31', '2024-01-01');  -- 365 dies

-- Afegir/restar temps
SELECT DATE_ADD('2024-01-15', INTERVAL 30 DAY);   -- 2024-02-14
SELECT DATE_SUB('2024-01-15', INTERVAL 1 MONTH);  -- 2023-12-15`,booleans:`CREATE TABLE usuaris (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nom         VARCHAR(50),
    actiu       BOOLEAN DEFAULT TRUE,     -- Equivalent a TINYINT(1)
    verificat   TINYINT(1) DEFAULT 0      -- Forma explícita
);

-- Inserir valors booleans
INSERT INTO usuaris (nom, actiu, verificat) VALUES
    ('Anna', TRUE, 1),
    ('Pere', FALSE, 0);

-- Consultar (ambdues formes funcionen)
SELECT * FROM usuaris WHERE actiu = TRUE;
SELECT * FROM usuaris WHERE actiu = 1;`,enum:`CREATE TABLE comandes (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    producte    VARCHAR(100),
    estat       ENUM('pendent', 'processant', 'enviat', 'entregat', 'cancel·lat'),
    mida        ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL')
);

-- Inserir (només valors vàlids)
INSERT INTO comandes (producte, estat, mida) VALUES
    ('Samarreta', 'pendent', 'M');

-- Això donaria ERROR perquè 'XXS' no està a la llista
-- INSERT INTO comandes (producte, estat, mida) VALUES ('Samarreta', 'pendent', 'XXS');`,set:`CREATE TABLE articles (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titol       VARCHAR(200),
    etiquetes   SET('tecnologia', 'esports', 'cultura', 'politica', 'economia')
);

-- Inserir amb múltiples valors
INSERT INTO articles (titol, etiquetes) VALUES
    ('Nou iPhone presentat', 'tecnologia,economia'),
    ('Final Champions', 'esports');

-- Buscar articles amb una etiqueta específica
SELECT * FROM articles WHERE FIND_IN_SET('tecnologia', etiquetes);`,null:`CREATE TABLE clients (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nom             VARCHAR(50)  NOT NULL,      -- Obligatori
    email           VARCHAR(100) NOT NULL,      -- Obligatori
    telefon         VARCHAR(20),                -- Opcional (pot ser NULL)
    data_baixa      DATE                        -- NULL = client actiu
);

-- Comparar amb NULL (NO usar =)
SELECT * FROM clients WHERE telefon IS NULL;       -- Correcte
SELECT * FROM clients WHERE telefon IS NOT NULL;   -- Correcte
-- SELECT * FROM clients WHERE telefon = NULL;     -- MAL! No funciona

-- Substituir NULL per un valor
SELECT nom, COALESCE(telefon, 'No disponible') AS telefon FROM clients;`,crearTaulaProducts:`-- Primer, assegura't d'estar a la BD correcta
USE botiga;

-- Crear la taula de productes
CREATE TABLE Products (
    -- Clau primària auto-incrementable
    ProductID       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Dades del producte
    ProductName     VARCHAR(100) NOT NULL,
    Description     TEXT,

    -- Relacions (claus foranes en el futur)
    SupplierID      INT UNSIGNED,
    CategoryID      INT UNSIGNED,

    -- Dades d'inventari
    Unit            VARCHAR(50),
    Stock           SMALLINT UNSIGNED DEFAULT 0,

    -- Preus (sempre DECIMAL per diners)
    Price           DECIMAL(10,2) NOT NULL,
    CostPrice       DECIMAL(10,2),

    -- Estat del producte
    IsActive        BOOLEAN DEFAULT TRUE,

    -- Auditoria automàtica
    CreatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Veure l'estructura de la taula
DESCRIBE Products;`,crearTaulaEmployees:`CREATE TABLE Employees (
    EmployeeID      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Dades personals
    FirstName       VARCHAR(30) NOT NULL,
    LastName        VARCHAR(50) NOT NULL,
    NIF             CHAR(9) UNIQUE,          -- CHAR perquè sempre són 9 caràcters
    BirthDate       DATE,
    Gender          ENUM('M', 'F', 'Altre'),

    -- Contacte
    Email           VARCHAR(100) UNIQUE NOT NULL,
    Phone           VARCHAR(20),
    Address         VARCHAR(200),
    City            VARCHAR(50),
    PostalCode      CHAR(5),                 -- CHAR perquè sempre són 5 dígits

    -- Dades laborals
    Position        VARCHAR(50),
    Department      ENUM('Vendes', 'IT', 'RRHH', 'Finances', 'Operacions'),
    HireDate        DATE NOT NULL,
    Salary          DECIMAL(10,2) UNSIGNED,

    -- Estat
    IsActive        BOOLEAN DEFAULT TRUE,
    TerminationDate DATE,                    -- NULL = empleat actiu

    -- Auditoria
    CreatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,insertProducts:`INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Stock, Price) VALUES
    ('Chais',                            1, 1, '10 boxes x 20 bags',     39,  18.00),
    ('Chang',                            1, 1, '24 - 12 oz bottles',     17,  19.00),
    ('Aniseed Syrup',                    1, 2, '12 - 550 ml bottles',    13,  10.00),
    ('Chef Anton''s Cajun Seasoning',    2, 2, '48 - 6 oz jars',         53,  22.00),
    ('Chef Anton''s Gumbo Mix',          2, 2, '36 boxes',                0,  21.35),
    ('Grandma''s Boysenberry Spread',    3, 2, '12 - 8 oz jars',        120,  25.00),
    ('Uncle Bob''s Organic Dried Pears', 3, 7, '12 - 1 lb pkgs.',        15,  30.00),
    ('Northwoods Cranberry Sauce',       3, 2, '12 - 12 oz jars',         6,  40.00);

-- Verificar les dades
SELECT * FROM Products;`,insertEmployees:`INSERT INTO Employees (FirstName, LastName, BirthDate, Email, Position, Department, HireDate, Salary) VALUES
    ('Nancy',    'Davolio',   '1968-12-08', 'nancy@empresa.com',    'Sales Representative', 'Vendes', '1992-05-01', 2500.00),
    ('Andrew',   'Fuller',    '1952-02-19', 'andrew@empresa.com',   'Vice President',       'Vendes', '1992-08-14', 4500.00),
    ('Janet',    'Leverling', '1963-08-30', 'janet@empresa.com',    'Sales Representative', 'Vendes', '1992-04-01', 2600.00),
    ('Margaret', 'Peacock',   '1958-09-19', 'margaret@empresa.com', 'Sales Representative', 'Vendes', '1993-05-03', 2400.00),
    ('Steven',   'Buchanan',  '1955-03-04', 'steven@empresa.com',   'Sales Manager',        'Vendes', '1993-10-17', 3500.00),
    ('Michael',  'Suyama',    '1963-07-02', 'michael@empresa.com',  'Sales Representative', 'Vendes', '1993-10-17', 2300.00),
    ('Robert',   'King',      '1960-05-29', 'robert@empresa.com',   'Sales Representative', 'Vendes', '1994-01-02', 2500.00),
    ('Laura',    'Callahan',  '1958-01-09', 'laura@empresa.com',    'Inside Sales Coord.',  'Vendes', '1994-03-05', 2200.00);

-- Verificar les dades
SELECT EmployeeID, FirstName, LastName, Position, Salary FROM Employees;`};function G(){return e.jsxs(e.Fragment,{children:[e.jsx(C,{tag:"Mòdul 1",title:"Bases de Dades i Tipus de Dades",subtitle:"Aprèn a crear bases de dades i domina tots els tipus de dades de MySQL amb exemples pràctics per executar directament al Workbench"}),e.jsxs("div",{className:"container",children:[e.jsxs("section",{id:"crear-bd",children:[e.jsx("h2",{children:"Crear una Base de Dades"}),e.jsx("h3",{children:"Exemple per executar"}),e.jsx("p",{children:"Obre MySQL Workbench, connecta't al servidor i executa aquest codi:"}),e.jsx(r,{label:"SQL — Crear base de dades",code:d.crearBd}),e.jsx("h3",{children:"Explicació detallada"}),e.jsx("h4",{children:"CREATE DATABASE"}),e.jsx("p",{children:"Aquesta sentència crea una nova base de dades buida al servidor MySQL. Una base de dades és un contenidor lògic que agrupa taules, vistes, procediments i altres objectes relacionats."}),e.jsx(r,{label:"Sintaxi completa",code:d.sintaxiCreateDb}),e.jsxs(x,{headers:["Paràmetre","Descripció","Exemple"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"nom_base_dades"})}),e.jsx("td",{children:"Nom únic per identificar la BD. No pot contenir espais ni caràcters especials (excepte _). Màxim 64 caràcters."}),e.jsxs("td",{children:[e.jsx("code",{children:"botiga"}),", ",e.jsx("code",{children:"empresa_2024"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"IF NOT EXISTS"})}),e.jsx("td",{children:"Opcional. Evita errors si la BD ja existeix. Sense això, MySQL retorna error si intentes crear una BD existent."}),e.jsx("td",{children:e.jsx("code",{children:"CREATE DATABASE IF NOT EXISTS botiga;"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"CHARACTER SET"})}),e.jsxs("td",{children:["Codificació de caràcters. ",e.jsx("code",{children:"utf8mb4"})," és recomanat perquè suporta tots els caràcters Unicode, incloent emojis."]}),e.jsx("td",{children:e.jsx("code",{children:"CHARACTER SET utf8mb4"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"COLLATE"})}),e.jsx("td",{children:"Regles d'ordenació i comparació. Determina com es comparen els textos (sensible a majúscules, accents, etc.)."}),e.jsx("td",{children:e.jsx("code",{children:"COLLATE utf8mb4_unicode_ci"})})]})]}),e.jsx(l,{type:"tip",title:"Recomanació professional",children:e.jsxs("p",{children:["Sempre utilitza ",e.jsx("code",{children:"utf8mb4"})," com a charset. L'antic ",e.jsx("code",{children:"utf8"})," de MySQL només suporta 3 bytes i no pot emmagatzemar alguns caràcters Unicode com emojis o símbols especials."]})}),e.jsx(r,{label:"SQL — Exemple complet recomanat",code:d.crearBdComplet}),e.jsx("h4",{children:"USE"}),e.jsx("p",{children:"Selecciona una base de dades per treballar-hi. Totes les operacions posteriors (crear taules, inserir dades, consultes) s'executaran sobre aquesta BD fins que en seleccionis una altra o tanquis la connexió."}),e.jsx(r,{label:"SQL",code:d.useBd}),e.jsx(l,{type:"warning",title:"Important",children:e.jsxs("p",{children:["Si no executes ",e.jsx("code",{children:"USE"})," abans de crear taules o fer consultes, MySQL no sabrà on fer l'operació i retornarà l'error: ",e.jsx("code",{children:"No database selected"}),"."]})}),e.jsx("h4",{children:"Altres comandes útils"}),e.jsx(r,{label:"SQL — Gestió de bases de dades",code:d.gestiobd}),e.jsx(l,{type:"danger",title:"Perill: DROP DATABASE",children:e.jsxs("p",{children:[e.jsx("code",{children:"DROP DATABASE"})," elimina permanentment la base de dades i"," ",e.jsx("strong",{children:"totes les taules i dades que conté"}),". Aquesta acció és irreversible. No hi ha confirmació ni paperera de reciclatge. Utilitza-ho amb molta precaució, especialment en entorns de producció."]})})]}),e.jsxs("section",{id:"numerics",children:[e.jsx("h2",{children:"Tipus de Dades Numèrics"}),e.jsx("p",{children:"MySQL ofereix diversos tipus per emmagatzemar números. Escollir el tipus correcte és crucial per optimitzar l'espai d'emmagatzematge i garantir que les dades es guardin correctament."}),e.jsx("h3",{children:"Números Enters (Integers)"}),e.jsx(r,{label:"SQL — Exemple de tipus enters",code:d.enters}),e.jsxs(x,{headers:["Tipus","Bytes","Rang SIGNED","Rang UNSIGNED","Cas d'ús"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"TINYINT"})}),e.jsx("td",{children:"1"}),e.jsx("td",{children:"-128 a 127"}),e.jsx("td",{children:"0 a 255"}),e.jsx("td",{children:"Edats, puntuacions petites, booleans"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SMALLINT"})}),e.jsx("td",{children:"2"}),e.jsx("td",{children:"-32,768 a 32,767"}),e.jsx("td",{children:"0 a 65,535"}),e.jsx("td",{children:"Anys, quantitats mitjanes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"MEDIUMINT"})}),e.jsx("td",{children:"3"}),e.jsx("td",{children:"-8,388,608 a 8,388,607"}),e.jsx("td",{children:"0 a 16,777,215"}),e.jsx("td",{children:"Codis postals, IDs mitjans"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"INT"})}),e.jsx("td",{children:"4"}),e.jsx("td",{children:"-2,147,483,648 a 2,147,483,647"}),e.jsx("td",{children:"0 a 4,294,967,295"}),e.jsx("td",{children:"IDs, quantitats grans, poblacions"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"BIGINT"})}),e.jsx("td",{children:"8"}),e.jsxs("td",{children:["±9.2 × 10",e.jsx("sup",{children:"18"})]}),e.jsxs("td",{children:["0 a 1.8 × 10",e.jsx("sup",{children:"19"})]}),e.jsx("td",{children:"Comptadors massius, timestamps en ms"})]})]}),e.jsx("h4",{children:"SIGNED vs UNSIGNED"}),e.jsxs("p",{children:["Per defecte, tots els tipus enters són ",e.jsx("code",{children:"SIGNED"}),", és a dir, permeten valors negatius. Si saps que mai tindràs valors negatius (com edats, IDs, quantitats), pots usar"," ",e.jsx("code",{children:"UNSIGNED"})," per duplicar el rang positiu."]}),e.jsxs(A,{children:[e.jsx(h,{name:"TINYINT SIGNED",tag:"per defecte",rangeLabels:["-128","0","127"],children:e.jsx("p",{children:"Permet negatius però limita el màxim a 127"})}),e.jsx(h,{name:"TINYINT UNSIGNED",rangeLabels:["0","127","255"],children:e.jsx("p",{children:"Sense negatius però arriba fins a 255"})})]}),e.jsx(l,{type:"tip",title:"Quan usar UNSIGNED",children:e.jsxs("p",{children:["Utilitza ",e.jsx("code",{children:"UNSIGNED"})," per: identificadors (IDs), edats, quantitats, comptadors, qualsevol valor que mai serà negatiu. A més d'augmentar el rang, comunica clarament la intenció del camp."]})}),e.jsx("h3",{children:"Números Decimals (Punt Flotant i Precisió Fixa)"}),e.jsx(r,{label:"SQL — Exemple de tipus decimals",code:d.decimals}),e.jsxs(x,{headers:["Tipus","Bytes","Precisió","Quan usar"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DECIMAL(M,D)"})}),e.jsx("td",{children:"Variable"}),e.jsx("td",{children:"Exacta (M dígits totals, D decimals)"}),e.jsx("td",{children:e.jsx("strong",{children:"Diners, preus, quantitats exactes"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"FLOAT"})}),e.jsx("td",{children:"4"}),e.jsx("td",{children:"~7 dígits significatius"}),e.jsx("td",{children:"Càlculs científics, on petits errors són acceptables"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DOUBLE"})}),e.jsx("td",{children:"8"}),e.jsx("td",{children:"~15 dígits significatius"}),e.jsx("td",{children:"Coordenades GPS, càlculs que necessiten més precisió"})]})]}),e.jsx("h4",{children:"DECIMAL(M,D) en detall"}),e.jsxs("p",{children:[e.jsx("code",{children:"M"})," és el nombre total de dígits (precisió) i ",e.jsx("code",{children:"D"})," és el nombre de dígits després del punt decimal (escala)."]}),e.jsx(r,{label:"Exemples de DECIMAL",code:d.exempleDecimal}),e.jsx(l,{type:"danger",title:"Mai FLOAT per a diners",children:e.jsxs("p",{children:[e.jsx("code",{children:"FLOAT"})," i ",e.jsx("code",{children:"DOUBLE"})," són tipus de punt flotant que poden tenir errors de precisió. Per exemple, ",e.jsx("code",{children:"0.1 + 0.2"})," pot donar ",e.jsx("code",{children:"0.30000000000000004"}),". Sempre utilitza ",e.jsx("code",{children:"DECIMAL"})," per a valors monetaris o qualsevol dada que requereixi precisió exacta."]})}),e.jsx(r,{label:"SQL — Demostració de l'error de FLOAT",code:d.floatError})]}),e.jsxs("section",{id:"text",children:[e.jsx("h2",{children:"Tipus de Dades de Text"}),e.jsx("p",{children:"MySQL proporciona diversos tipus per emmagatzemar cadenes de caràcters, cadascun optimitzat per a diferents longituds i usos."}),e.jsx("h3",{children:"CHAR vs VARCHAR"}),e.jsx(r,{label:"SQL — Exemple de tipus de text",code:d.text}),e.jsxs(x,{headers:["Tipus","Longitud màxima","Emmagatzematge","Cas d'ús"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"CHAR(n)"})}),e.jsx("td",{children:"255 caràcters"}),e.jsx("td",{children:"Sempre n bytes (omple amb espais)"}),e.jsx("td",{children:"Codis fixos: país, NIF, codi postal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"VARCHAR(n)"})}),e.jsx("td",{children:"65,535 caràcters*"}),e.jsx("td",{children:"Longitud real + 1-2 bytes"}),e.jsx("td",{children:"Noms, emails, textos curts variables"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"TINYTEXT"})}),e.jsx("td",{children:"255 caràcters"}),e.jsx("td",{children:"Longitud + 1 byte"}),e.jsx("td",{children:"Missatges curts"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"TEXT"})}),e.jsx("td",{children:"65,535 caràcters"}),e.jsx("td",{children:"Longitud + 2 bytes"}),e.jsx("td",{children:"Descripcions, comentaris"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"MEDIUMTEXT"})}),e.jsx("td",{children:"16 MB"}),e.jsx("td",{children:"Longitud + 3 bytes"}),e.jsx("td",{children:"Articles, biografies"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"LONGTEXT"})}),e.jsx("td",{children:"4 GB"}),e.jsx("td",{children:"Longitud + 4 bytes"}),e.jsx("td",{children:"Llibres, logs massius"})]})]}),e.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-muted)"},children:"* La longitud real de VARCHAR depèn del charset. Amb utf8mb4 (4 bytes/caràcter), el màxim pràctic és ~16,383 caràcters."}),e.jsx("h3",{children:"Diferència visual entre CHAR i VARCHAR"}),e.jsxs("div",{className:"diagram",children:[e.jsx("div",{className:"diagram-title",children:'CHAR(10) vs VARCHAR(10) emmagatzemant "Hola"'}),e.jsxs("div",{className:"char-row",children:[e.jsx("span",{className:"char-row-label",children:"CHAR(10)"}),e.jsxs("div",{className:"char-boxes",children:[["H","o","l","a"].map((a,s)=>e.jsx("div",{className:"char-box filled",children:a},s)),[...Array(6)].map((a,s)=>e.jsx("div",{className:"char-box empty",children:"·"},s))]}),e.jsx("span",{className:"char-row-note",children:"→ Sempre ocupa 10 bytes (omple amb espais)"})]}),e.jsxs("div",{className:"char-row",children:[e.jsx("span",{className:"char-row-label",children:"VARCHAR(10)"}),e.jsxs("div",{className:"char-boxes",children:[e.jsx("div",{className:"char-box meta",children:"4"}),["H","o","l","a"].map((a,s)=>e.jsx("div",{className:"char-box filled",children:a},s))]}),e.jsx("span",{className:"char-row-note",children:"→ Només 5 bytes (1 longitud + 4 dades)"})]})]}),e.jsxs(l,{type:"info",title:"Quan usar CHAR vs VARCHAR",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"CHAR:"})," quan la longitud és sempre fixa (codis de país, DNI, codis postals). És més ràpid en cerques perquè MySQL sap exactament on comença cada registre."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"VARCHAR:"})," quan la longitud varia (noms, emails, descripcions). Estalvia espai però té una petita sobrecàrrega per guardar la longitud."]})]}),e.jsx("h3",{children:"TEXT i variants"}),e.jsx("p",{children:"Els tipus TEXT s'emmagatzemen fora de la fila principal de la taula, el que els fa adequats per a textos llargs però menys eficients per a cerques."}),e.jsx(l,{type:"warning",title:"Limitacions de TEXT",children:e.jsxs("p",{children:["Els camps TEXT no poden tenir valors per defecte, no es poden indexar completament (només els primers N caràcters), i són més lents en ordenacions. Si el teu text cabrà en 255 caràcters o menys, utilitza ",e.jsx("code",{children:"VARCHAR"}),"."]})})]}),e.jsxs("section",{id:"data-hora",children:[e.jsx("h2",{children:"Tipus de Dades de Data i Hora"}),e.jsx(r,{label:"SQL — Exemple de tipus temporals",code:d.dates}),e.jsxs(x,{headers:["Tipus","Format","Rang","Bytes","Cas d'ús"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DATE"})}),e.jsx("td",{children:e.jsx("code",{children:"'AAAA-MM-DD'"})}),e.jsx("td",{children:"1000-01-01 a 9999-12-31"}),e.jsx("td",{children:"3"}),e.jsx("td",{children:"Dates de naixement, venciments"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"TIME"})}),e.jsx("td",{children:e.jsx("code",{children:"'HH:MM:SS'"})}),e.jsx("td",{children:"-838:59:59 a 838:59:59"}),e.jsx("td",{children:"3"}),e.jsx("td",{children:"Durades, horaris"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DATETIME"})}),e.jsx("td",{children:e.jsx("code",{children:"'AAAA-MM-DD HH:MM:SS'"})}),e.jsx("td",{children:"1000-01-01 a 9999-12-31"}),e.jsx("td",{children:"8"}),e.jsx("td",{children:"Esdeveniments, registres"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"TIMESTAMP"})}),e.jsx("td",{children:e.jsx("code",{children:"'AAAA-MM-DD HH:MM:SS'"})}),e.jsx("td",{children:"1970-01-01 a 2038-01-19"}),e.jsx("td",{children:"4"}),e.jsx("td",{children:"Auditoria, última modificació"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"YEAR"})}),e.jsx("td",{children:e.jsx("code",{children:"AAAA"})}),e.jsx("td",{children:"1901 a 2155"}),e.jsx("td",{children:"1"}),e.jsx("td",{children:"Anys d'edició, fabricació"})]})]}),e.jsx("h3",{children:"DATETIME vs TIMESTAMP"}),e.jsx("p",{children:"Semblen iguals però tenen diferències importants:"}),e.jsxs(A,{children:[e.jsxs(h,{name:"DATETIME",children:[e.jsxs("ul",{children:[e.jsx("li",{children:"Emmagatzema la data/hora tal qual"}),e.jsx("li",{children:"No depèn de la zona horària"}),e.jsx("li",{children:"Rang més ampli (fins any 9999)"}),e.jsx("li",{children:"8 bytes d'emmagatzematge"})]}),e.jsx("p",{style:{marginTop:"0.75rem",fontSize:"0.85rem"},children:"Usa per: dates fixes com naixements, esdeveniments històrics"})]}),e.jsxs(h,{name:"TIMESTAMP",children:[e.jsxs("ul",{children:[e.jsx("li",{children:"Converteix a UTC al guardar"}),e.jsx("li",{children:"Converteix a zona horària local al llegir"}),e.jsx("li",{children:"Rang limitat (fins 2038)"}),e.jsx("li",{children:"4 bytes d'emmagatzematge"})]}),e.jsx("p",{style:{marginTop:"0.75rem",fontSize:"0.85rem"},children:"Usa per: registres d'auditoria, última modificació"})]})]}),e.jsx(r,{label:"SQL — TIMESTAMP amb auto-actualització",code:d.timestampAuto}),e.jsx(l,{type:"warning",title:"Problema de l'any 2038",children:e.jsxs("p",{children:["TIMESTAMP utilitza un enter de 32 bits per emmagatzemar segons des de 1970-01-01. Aquest valor arribarà al màxim el ",e.jsx("strong",{children:"19 de gener de 2038"})," a les 03:14:07 UTC. Si la teva aplicació necessita dates posteriors, utilitza ",e.jsx("code",{children:"DATETIME"}),"."]})}),e.jsx("h3",{children:"Funcions útils de data/hora"}),e.jsx(r,{label:"SQL — Funcions de data i hora",code:d.funcionsData})]}),e.jsxs("section",{id:"altres",children:[e.jsx("h2",{children:"Altres Tipus de Dades"}),e.jsx("h3",{children:"BOOLEAN"}),e.jsxs("p",{children:["MySQL no té un tipus BOOLEAN natiu. ",e.jsx("code",{children:"BOOLEAN"})," és un àlies de"," ",e.jsx("code",{children:"TINYINT(1)"}),". Els valors ",e.jsx("code",{children:"TRUE"})," i ",e.jsx("code",{children:"FALSE"})," es converteixen a 1 i 0 respectivament."]}),e.jsx(r,{label:"SQL — Booleans a MySQL",code:d.booleans}),e.jsx("h3",{children:"ENUM"}),e.jsx("p",{children:"ENUM permet definir una llista de valors permesos. Només es pot emmagatzemar un dels valors de la llista (o NULL si es permet)."}),e.jsx(r,{label:"SQL — ENUM",code:d.enum}),e.jsxs(l,{type:"info",title:"Avantatges i desavantatges d'ENUM",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Avantatges:"})," validació automàtica, emmagatzematge eficient (1-2 bytes), codi més llegible."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Desavantatges:"})," modificar la llista requereix ",e.jsx("code",{children:"ALTER TABLE"}),", l'ordre dels valors importa internament, pot ser problemàtic en migracions."]})]}),e.jsx("h3",{children:"SET"}),e.jsx("p",{children:"SET és similar a ENUM però permet múltiples valors simultàniament."}),e.jsx(r,{label:"SQL — SET",code:d.set}),e.jsx("h3",{children:"NULL"}),e.jsx("p",{children:`NULL representa l'absència de valor. No és zero, no és una cadena buida, és "res" o "desconegut".`}),e.jsx(r,{label:"SQL — Treballant amb NULL",code:d.null}),e.jsx(l,{type:"danger",title:"NULL no és igual a res",children:e.jsxs("p",{children:[e.jsx("code",{children:"NULL = NULL"})," retorna NULL, no TRUE. Sempre utilitza"," ",e.jsx("code",{children:"IS NULL"})," o ",e.jsx("code",{children:"IS NOT NULL"})," per comparar. Aquesta és una font molt comuna d'errors en SQL."]})})]}),e.jsxs("section",{id:"crear-taules",children:[e.jsx("h2",{children:"Crear Taules amb Tipus de Dades"}),e.jsx("p",{children:"Ara que coneixem tots els tipus de dades, vegem com crear una taula completa amb restriccions i bones pràctiques."}),e.jsx("h3",{children:"Exemple complet: Taula de Productes"}),e.jsx(r,{label:"SQL — Crear taula Products",code:d.crearTaulaProducts}),e.jsx("h3",{children:"Exemple complet: Taula d'Empleats"}),e.jsx(r,{label:"SQL — Crear taula Employees",code:d.crearTaulaEmployees}),e.jsx("h3",{children:"Inserir dades d'exemple"}),e.jsx(r,{label:"SQL — Inserir dades a Products",code:d.insertProducts}),e.jsx(r,{label:"SQL — Inserir dades a Employees",code:d.insertEmployees}),e.jsx("h3",{children:"Restriccions (Constraints)"}),e.jsxs(x,{headers:["Restricció","Descripció","Exemple"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"PRIMARY KEY"})}),e.jsx("td",{children:"Identificador únic de cada registre. No pot ser NULL ni duplicat."}),e.jsx("td",{children:e.jsx("code",{children:"id INT PRIMARY KEY"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"AUTO_INCREMENT"})}),e.jsx("td",{children:"Genera automàticament un valor seqüencial (1, 2, 3…)"}),e.jsx("td",{children:e.jsx("code",{children:"id INT AUTO_INCREMENT"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"NOT NULL"})}),e.jsx("td",{children:"El camp no pot quedar buit"}),e.jsx("td",{children:e.jsx("code",{children:"nom VARCHAR(50) NOT NULL"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"UNIQUE"})}),e.jsx("td",{children:"No permet valors duplicats (però sí múltiples NULLs)"}),e.jsx("td",{children:e.jsx("code",{children:"email VARCHAR(100) UNIQUE"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DEFAULT"})}),e.jsx("td",{children:"Valor per defecte si no s'especifica"}),e.jsx("td",{children:e.jsx("code",{children:"actiu BOOLEAN DEFAULT TRUE"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"UNSIGNED"})}),e.jsx("td",{children:"Només valors positius (duplica el rang positiu)"}),e.jsx("td",{children:e.jsx("code",{children:"edat TINYINT UNSIGNED"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"CHECK"})}),e.jsx("td",{children:"Condició que han de complir els valors (MySQL 8.0+)"}),e.jsx("td",{children:e.jsx("code",{children:"edat INT CHECK (edat >= 0)"})})]})]}),e.jsx(l,{type:"tip",title:"Bones pràctiques al crear taules",children:e.jsxs("ol",{children:[e.jsxs("li",{children:["Sempre defineix una ",e.jsx("code",{children:"PRIMARY KEY"}),", preferiblement ",e.jsx("code",{children:"INT UNSIGNED AUTO_INCREMENT"}),"."]}),e.jsxs("li",{children:["Usa ",e.jsx("code",{children:"NOT NULL"})," per camps obligatoris."]}),e.jsxs("li",{children:["Usa ",e.jsx("code",{children:"DECIMAL"})," per diners, mai ",e.jsx("code",{children:"FLOAT"}),"."]}),e.jsxs("li",{children:["Afegeix camps ",e.jsx("code",{children:"CreatedAt"})," i ",e.jsx("code",{children:"UpdatedAt"})," per auditoria."]}),e.jsxs("li",{children:["Usa ",e.jsx("code",{children:"CHAR"})," per longituds fixes, ",e.jsx("code",{children:"VARCHAR"})," per variables."]}),e.jsx("li",{children:"Escull el tipus enter més petit que cobreixi les teves necessitats."})]})})]})]})]})}const o={sum:`-- Quant sumen tots els preus?
SELECT SUM(Price) AS TotalPreus
FROM Products;
-- TotalPreus: 185.35`,count:`SELECT COUNT(*) AS TotalProductes
FROM Products;
-- TotalProductes: 8`,avg:`SELECT AVG(Price) AS PreuMitja
FROM Products;
-- PreuMitja: 23.1687

-- Equivalent manual (dóna el mateix):
SELECT SUM(Price) / COUNT(*) AS PreuMitja
FROM Products;`,maxMin:`SELECT MAX(Price) AS MesCar, MIN(Price) AS MesBarat
FROM Products;
-- MesCar: 40  |  MesBarat: 10`,agregacioError:`-- INCORRECTE: ProductName no forma part de cap agrupació
SELECT ProductName, AVG(Price) FROM Products; -- ERROR!

-- CORRECTE: agrupar per ProductName
SELECT ProductName, AVG(Price) AS PreuMitja
FROM Products
GROUP BY ProductName;`,alias:`-- Sense AS: columna = "SUM(Price)/COUNT(*)" → impossible de llegir
SELECT SUM(Price) / COUNT(*) FROM Products;

-- Amb AS: ara la columna es diu "PreuMitja"
SELECT SUM(Price) / COUNT(*) AS PreuMitja FROM Products;

-- Si l'àlies té espais, s'enclouen entre cometes
SELECT ProductName AS Producte, Price AS "Preu (€)"
FROM Products;`,groupBy:`-- Quants productes té cada proveïdor?
SELECT SupplierID, COUNT(*) AS Productes
FROM Products
GROUP BY SupplierID;
-- SupplierID 1 → 3 productes
-- SupplierID 2 → 2 productes
-- SupplierID 3 → 3 productes

-- Agrupar per dos camps alhora
SELECT SupplierID, CategoryID, COUNT(*) AS Productes
FROM Products
GROUP BY SupplierID, CategoryID;`,distinct:`-- Sense DISTINCT: llista amb repeticions
SELECT SupplierID FROM Products;
-- 1, 1, 1, 2, 2, 3, 3, 3

-- Amb DISTINCT: valors únics
SELECT DISTINCT SupplierID FROM Products;
-- 1, 2, 3`,having:`-- Proveïdors amb MÉS DE 2 productes
SELECT SupplierID, COUNT(*) AS Productes
FROM Products
GROUP BY SupplierID
HAVING COUNT(*) > 2;

-- Combinant WHERE (filtra files) + HAVING (filtra grups)
SELECT SupplierID, COUNT(*) AS Productes
FROM Products
WHERE Price >= 15
GROUP BY SupplierID
HAVING COUNT(*) > 1;`,orderBy:`-- De menor a major (ASC és el defecte)
SELECT ProductName, Price FROM Products
ORDER BY Price;

-- De major a menor
SELECT ProductName, Price FROM Products
ORDER BY Price DESC;

-- Múltiples columnes: primer per SupplierID descendent, després per Price ascendent
SELECT ProductName, SupplierID, Price FROM Products
ORDER BY SupplierID DESC, Price ASC;`,ordreClausules:`SELECT   camps_o_funcions        -- Quines dades vull veure?
FROM     taula                   -- D'on les trec?
WHERE    condicio                -- Quins registres? (opcional)
GROUP BY camp                   -- Com les agrupo? (opcional)
HAVING   condicio_de_grup       -- Quins grups mostro? (opcional)
ORDER BY camp [ASC|DESC];       -- En quin ordre? (opcional)`};function Y(){return e.jsxs(e.Fragment,{children:[e.jsx(C,{tag:"Mòdul 2",title:"Consultes SQL Avançades",subtitle:"Funcions d'agregació, agrupació, ordenació i filtres avançats per extreure informació útil de les dades"}),e.jsxs("div",{className:"container",children:[e.jsxs("section",{id:"agregacio",children:[e.jsx("h2",{children:"Funcions d'Agregació"}),e.jsxs("p",{children:["Fins ara les consultes retornen ",e.jsx("strong",{children:"files individuals"}),'. Però moltes vegades necessitem respostes del tipus: "Quin és el preu mitjà?", "Quants productes tenim?". Les ',e.jsx("strong",{children:"funcions d'agregació"})," calculen un sol valor a partir de tots els registres seleccionats."]}),e.jsx(l,{type:"info",title:"Analogia del món real",children:e.jsxs("p",{children:["Imagina les notes d'examen en un full de càlcul. Les funcions d'agregació fan el que faria un professor: ",e.jsx("code",{children:"AVG"})," calcula la nota mitjana, ",e.jsx("code",{children:"MAX"})," troba la nota més alta, ",e.jsx("code",{children:"COUNT"})," compta quants alumnes han fet l'examen."]})}),e.jsx("h3",{children:"SUM — Suma total"}),e.jsx(r,{label:"SQL — SUM",code:o.sum}),e.jsx("h3",{children:"COUNT — Comptar registres"}),e.jsxs("p",{children:["L'asterisc ",e.jsx("code",{children:"*"}),' significa "qualsevol camp", és a dir, compta totes les files.']}),e.jsx(r,{label:"SQL — COUNT",code:o.count}),e.jsx("h3",{children:"AVG — Mitjana (Average)"}),e.jsxs("p",{children:["AVG ve de l'anglès ",e.jsx("em",{children:"average"}),". Calcula la mitjana automàticament (equivalent a SUM/COUNT)."]}),e.jsx(r,{label:"SQL — AVG",code:o.avg}),e.jsx("h3",{children:"MAX i MIN — Màxim i mínim"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Atenció:"})," retornen el valor, no el registre sencer. Per saber quin producte és el més car cal una subconsulta (tema avançat)."]}),e.jsx(r,{label:"SQL — MAX i MIN",code:o.maxMin}),e.jsxs(l,{type:"warning",title:"Error freqüent: barrejar camps normals amb agregació",children:[e.jsx("p",{children:"Seleccionar un camp que no forma part de cap agrupació donarà error en mode estricte:"}),e.jsx(r,{label:"SQL — INCORRECTE vs CORRECTE",code:o.agregacioError})]}),e.jsxs(x,{headers:["Funció","Retorna","Exemple pràctic"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SUM(camp)"})}),e.jsx("td",{children:"Total acumulat"}),e.jsx("td",{children:"Total de vendes del mes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"COUNT(*)"})}),e.jsx("td",{children:"Número de registres"}),e.jsx("td",{children:"Quants clients tenim"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"AVG(camp)"})}),e.jsx("td",{children:"Valor promig"}),e.jsx("td",{children:"Nota mitjana dels alumnes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"MAX(camp)"})}),e.jsx("td",{children:"Valor més gran"}),e.jsx("td",{children:"Producte més car"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"MIN(camp)"})}),e.jsx("td",{children:"Valor més petit"}),e.jsx("td",{children:"Temperatura mínima registrada"})]})]})]}),e.jsxs("section",{id:"alias",children:[e.jsx("h2",{children:"AS — Renombrar columnes (Àlies)"}),e.jsxs("p",{children:["Quan usem funcions d'agregació, MySQL dona noms poc llegibles com"," ",e.jsx("code",{children:"SUM(Price)"})," o ",e.jsx("code",{children:"Expr1000"}),". La paraula clau ",e.jsx("code",{children:"AS"})," posa un ",e.jsx("strong",{children:"nom net"})," a qualsevol columna o expressió del resultat."]}),e.jsx(l,{type:"info",title:"Analogia",children:e.jsxs("p",{children:["És com posar una etiqueta a un pot: el contingut és el mateix, però ara saps el que hi ha dins. ",e.jsx("code",{children:"SUM(Price) AS TotalVendes"}),` → l'etiqueta és "TotalVendes".`]})}),e.jsx(r,{label:"SQL — AS",code:o.alias})]}),e.jsxs("section",{id:"group-by",children:[e.jsx("h2",{children:"GROUP BY — Agrupar dades"}),e.jsxs("p",{children:["GROUP BY divideix les dades en ",e.jsx("strong",{children:"subgrups"})," i calcula el resultat de les funcions d'agregació per a cada grup per separat."]}),e.jsx(l,{type:"info",title:"Analogia del supermercat",children:e.jsxs("p",{children:["Vols saber quants productes hi ha ",e.jsx("em",{children:"per secció"}),". Sense GROUP BY obtindries un sol número total. Amb GROUP BY obtens una fila per cada secció amb el seu recompte."]})}),e.jsx(r,{label:"SQL — GROUP BY",code:o.groupBy}),e.jsx(l,{type:"warning",title:"Regla d'or de GROUP BY",children:e.jsxs("p",{children:["Si una columna apareix al ",e.jsx("code",{children:"SELECT"})," ",e.jsx("em",{children:"sense"})," funció d'agregació,"," ",e.jsx("strong",{children:"ha d'aparèixer"})," al ",e.jsx("code",{children:"GROUP BY"}),". Altrament MySQL donarà error en mode estricte."]})})]}),e.jsxs("section",{id:"distinct",children:[e.jsx("h2",{children:"DISTINCT — Eliminar duplicats"}),e.jsxs("p",{children:["DISTINCT filtra les files repetides i retorna únicament els ",e.jsx("strong",{children:"valors únics"}),"."]}),e.jsx(l,{type:"info",title:"Analogia",children:e.jsx("p",{children:"Tens 100 comandes i vols saber de quins països provenen. Sense DISTINCT obtindries 100 països (molts repetits). Amb DISTINCT la llista neta de països únics."})}),e.jsx(r,{label:"SQL — DISTINCT",code:o.distinct})]}),e.jsxs("section",{id:"having",children:[e.jsx("h2",{children:"HAVING — Filtrar grups"}),e.jsxs("p",{children:[e.jsx("code",{children:"WHERE"})," filtra files ",e.jsx("em",{children:"individuals"})," abans d'agrupar."," ",e.jsx("code",{children:"HAVING"})," filtra ",e.jsx("strong",{children:"grups sencers"})," després de l'agrupació. Sempre va acompanyat de ",e.jsx("code",{children:"GROUP BY"}),"."]}),e.jsxs(l,{type:"info",title:"WHERE vs HAVING",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"WHERE"}),` = "Quins registres entren al càlcul?" → s'aplica `,e.jsx("em",{children:"abans"})," ","de GROUP BY, sobre files."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"HAVING"}),` = "Quins grups mostro?" → s'aplica `,e.jsx("em",{children:"després"})," de GROUP BY, sobre els resultats calculats."]})]}),e.jsx(r,{label:"SQL — HAVING",code:o.having}),e.jsxs(x,{headers:["Clàusula","Quan s'aplica","Filtra","Funcions d'agregació?"],children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"WHERE"})}),e.jsx("td",{children:"Abans de GROUP BY"}),e.jsx("td",{children:"Files individuals"}),e.jsx("td",{children:"No"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"HAVING"})}),e.jsx("td",{children:"Després de GROUP BY"}),e.jsx("td",{children:"Grups complets"}),e.jsx("td",{children:"Sí"})]})]})]}),e.jsxs("section",{id:"order-by",children:[e.jsx("h2",{children:"ORDER BY — Ordenar resultats"}),e.jsxs("p",{children:["ORDER BY és sempre l'",e.jsx("strong",{children:"última clàusula"})," d'una consulta. Ordena el resultat per una o més columnes. Per defecte és ",e.jsx("strong",{children:"ascendent (ASC)"}),": de menor a major, de A a Z."]}),e.jsx(r,{label:"SQL — ORDER BY",code:o.orderBy}),e.jsx(l,{type:"tip",title:"Ordre de les clàusules SQL — sempre en aquest ordre",children:e.jsx(r,{label:"Ordre correcte",code:o.ordreClausules})})]})]})]})}function Q(){return e.jsxs(b,{children:[e.jsx(V,{}),e.jsx("main",{children:e.jsxs(M,{children:[e.jsx(p,{path:"/",element:e.jsx(D,{to:"/modul/1",replace:!0})}),e.jsx(p,{path:"/modul/1",element:e.jsx(G,{})}),e.jsx(p,{path:"/modul/2",element:e.jsx(Y,{})})]})}),e.jsx(_,{})]})}g(document.getElementById("root")).render(e.jsx(j.StrictMode,{children:e.jsx(Q,{})}));
