import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'
import DataTable from '../components/DataTable'
import TypeCard from '../components/TypeCard'
import ComparisonGrid from '../components/ComparisonGrid'

// ─── SQL code strings ────────────────────────────────────────────────────────

const SQL = {
  crearBd: `-- Crear una nova base de dades
CREATE DATABASE botiga;

-- Seleccionar-la per treballar-hi
USE botiga;

-- Verificar que estem dins
SELECT DATABASE();`,

  sintaxiCreateDb: `CREATE DATABASE [IF NOT EXISTS] nom_base_dades
    [CHARACTER SET nom_charset]
    [COLLATE nom_collation];`,

  crearBdComplet: `CREATE DATABASE IF NOT EXISTS botiga
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;`,

  useBd: `USE botiga;`,

  gestiobd: `-- Veure totes les BD del servidor
SHOW DATABASES;

-- Veure quina BD estem utilitzant
SELECT DATABASE();

-- Veure informació detallada d'una BD
SHOW CREATE DATABASE botiga;

-- Eliminar una BD (COMPTE! Elimina totes les dades)
DROP DATABASE botiga;

-- Eliminar només si existeix (evita errors)
DROP DATABASE IF EXISTS botiga;`,

  enters: `CREATE TABLE exemple_enters (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    edat          TINYINT UNSIGNED,       -- 0 a 255
    quantitat     SMALLINT,               -- -32,768 a 32,767
    codi_postal   MEDIUMINT UNSIGNED,     -- 0 a 16,777,215
    poblacio      INT,                    -- ±2,147 milions
    visites_web   BIGINT UNSIGNED         -- 0 a 18 trilions
);`,

  decimals: `CREATE TABLE exemple_decimals (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    preu            DECIMAL(10,2),        -- Exacte: 99999999.99
    pes_kg          DECIMAL(5,3),         -- Exacte: 99.999 kg
    temperatura     FLOAT,                -- Aproximat: 7 dígits
    coordenada_lat  DOUBLE,               -- Aproximat: 15 dígits
    percentatge     DECIMAL(5,2)          -- Exacte: 100.00%
);`,

  exempleDecimal: `DECIMAL(10,2)  -- 8 enters + 2 decimals = màxim 99999999.99
DECIMAL(5,2)   -- 3 enters + 2 decimals = màxim 999.99
DECIMAL(3,0)   -- 3 enters + 0 decimals = màxim 999 (equivalent a SMALLINT)
DECIMAL(6,4)   -- 2 enters + 4 decimals = màxim 99.9999`,

  floatError: `-- Prova això al Workbench per veure la diferència:
SELECT
    CAST(0.1 AS FLOAT) + CAST(0.2 AS FLOAT)         AS resultat_float,
    CAST(0.1 AS DECIMAL(10,2)) + CAST(0.2 AS DECIMAL(10,2)) AS resultat_decimal;`,

  text: `CREATE TABLE exemple_text (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    codi_pais       CHAR(2),            -- Sempre 2 caràcters: 'ES', 'FR'
    nif             CHAR(9),            -- Sempre 9 caràcters: '12345678A'
    nom             VARCHAR(50),        -- Fins a 50 caràcters
    email           VARCHAR(255),       -- Estàndard per emails
    descripcio      TEXT,               -- Textos llargs
    biografia       MEDIUMTEXT          -- Textos molt llargs
);`,

  dates: `CREATE TABLE exemple_dates (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    data_naixement      DATE,               -- '1990-05-15'
    hora_entrada        TIME,               -- '09:30:00'
    data_creacio        DATETIME,           -- '2024-01-15 14:30:00'
    ultima_modificacio  TIMESTAMP,          -- Auto-actualitza
    any_publicacio      YEAR                -- 2024
);`,

  timestampAuto: `CREATE TABLE productes (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    nom                 VARCHAR(100),
    -- Es posa automàticament quan s'insereix
    creat_el            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- S'actualitza automàticament quan es modifica el registre
    actualitzat_el      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,

  funcionsData: `-- Data i hora actuals
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
SELECT DATE_SUB('2024-01-15', INTERVAL 1 MONTH);  -- 2023-12-15`,

  booleans: `CREATE TABLE usuaris (
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
SELECT * FROM usuaris WHERE actiu = 1;`,

  enum: `CREATE TABLE comandes (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    producte    VARCHAR(100),
    estat       ENUM('pendent', 'processant', 'enviat', 'entregat', 'cancel·lat'),
    mida        ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL')
);

-- Inserir (només valors vàlids)
INSERT INTO comandes (producte, estat, mida) VALUES
    ('Samarreta', 'pendent', 'M');

-- Això donaria ERROR perquè 'XXS' no està a la llista
-- INSERT INTO comandes (producte, estat, mida) VALUES ('Samarreta', 'pendent', 'XXS');`,

  set: `CREATE TABLE articles (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titol       VARCHAR(200),
    etiquetes   SET('tecnologia', 'esports', 'cultura', 'politica', 'economia')
);

-- Inserir amb múltiples valors
INSERT INTO articles (titol, etiquetes) VALUES
    ('Nou iPhone presentat', 'tecnologia,economia'),
    ('Final Champions', 'esports');

-- Buscar articles amb una etiqueta específica
SELECT * FROM articles WHERE FIND_IN_SET('tecnologia', etiquetes);`,

  null: `CREATE TABLE clients (
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
SELECT nom, COALESCE(telefon, 'No disponible') AS telefon FROM clients;`,

  crearTaulaProducts: `-- Primer, assegura't d'estar a la BD correcta
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
DESCRIBE Products;`,

  crearTaulaEmployees: `CREATE TABLE Employees (
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
);`,

  insertProducts: `INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Stock, Price) VALUES
    ('Chais',                            1, 1, '10 boxes x 20 bags',     39,  18.00),
    ('Chang',                            1, 1, '24 - 12 oz bottles',     17,  19.00),
    ('Aniseed Syrup',                    1, 2, '12 - 550 ml bottles',    13,  10.00),
    ('Chef Anton''s Cajun Seasoning',    2, 2, '48 - 6 oz jars',         53,  22.00),
    ('Chef Anton''s Gumbo Mix',          2, 2, '36 boxes',                0,  21.35),
    ('Grandma''s Boysenberry Spread',    3, 2, '12 - 8 oz jars',        120,  25.00),
    ('Uncle Bob''s Organic Dried Pears', 3, 7, '12 - 1 lb pkgs.',        15,  30.00),
    ('Northwoods Cranberry Sauce',       3, 2, '12 - 12 oz jars',         6,  40.00);

-- Verificar les dades
SELECT * FROM Products;`,

  insertEmployees: `INSERT INTO Employees (FirstName, LastName, BirthDate, Email, Position, Department, HireDate, Salary) VALUES
    ('Nancy',    'Davolio',   '1968-12-08', 'nancy@empresa.com',    'Sales Representative', 'Vendes', '1992-05-01', 2500.00),
    ('Andrew',   'Fuller',    '1952-02-19', 'andrew@empresa.com',   'Vice President',       'Vendes', '1992-08-14', 4500.00),
    ('Janet',    'Leverling', '1963-08-30', 'janet@empresa.com',    'Sales Representative', 'Vendes', '1992-04-01', 2600.00),
    ('Margaret', 'Peacock',   '1958-09-19', 'margaret@empresa.com', 'Sales Representative', 'Vendes', '1993-05-03', 2400.00),
    ('Steven',   'Buchanan',  '1955-03-04', 'steven@empresa.com',   'Sales Manager',        'Vendes', '1993-10-17', 3500.00),
    ('Michael',  'Suyama',    '1963-07-02', 'michael@empresa.com',  'Sales Representative', 'Vendes', '1993-10-17', 2300.00),
    ('Robert',   'King',      '1960-05-29', 'robert@empresa.com',   'Sales Representative', 'Vendes', '1994-01-02', 2500.00),
    ('Laura',    'Callahan',  '1958-01-09', 'laura@empresa.com',    'Inside Sales Coord.',  'Vendes', '1994-03-05', 2200.00);

-- Verificar les dades
SELECT EmployeeID, FirstName, LastName, Position, Salary FROM Employees;`,
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Modul1() {
  return (
    <>
      <PageHeader
        tag="Mòdul 1"
        title="Bases de Dades i Tipus de Dades"
        subtitle="Aprèn a crear bases de dades i domina tots els tipus de dades de MySQL amb exemples pràctics per executar directament al Workbench"
      />

      <div className="container">

        {/* ── CREAR BASE DE DADES ── */}
        <section id="crear-bd">
          <h2>Crear una Base de Dades</h2>

          <h3>Exemple per executar</h3>
          <p>Obre MySQL Workbench, connecta't al servidor i executa aquest codi:</p>
          <CodeBlock label="SQL — Crear base de dades" code={SQL.crearBd} />

          <h3>Explicació detallada</h3>

          <h4>CREATE DATABASE</h4>
          <p>
            Aquesta sentència crea una nova base de dades buida al servidor MySQL. Una base de dades
            és un contenidor lògic que agrupa taules, vistes, procediments i altres objectes relacionats.
          </p>
          <CodeBlock label="Sintaxi completa" code={SQL.sintaxiCreateDb} />

          <DataTable headers={['Paràmetre', 'Descripció', 'Exemple']}>
            <tr>
              <td><code>nom_base_dades</code></td>
              <td>Nom únic per identificar la BD. No pot contenir espais ni caràcters especials (excepte _). Màxim 64 caràcters.</td>
              <td><code>botiga</code>, <code>empresa_2024</code></td>
            </tr>
            <tr>
              <td><code>IF NOT EXISTS</code></td>
              <td>Opcional. Evita errors si la BD ja existeix. Sense això, MySQL retorna error si intentes crear una BD existent.</td>
              <td><code>CREATE DATABASE IF NOT EXISTS botiga;</code></td>
            </tr>
            <tr>
              <td><code>CHARACTER SET</code></td>
              <td>Codificació de caràcters. <code>utf8mb4</code> és recomanat perquè suporta tots els caràcters Unicode, incloent emojis.</td>
              <td><code>CHARACTER SET utf8mb4</code></td>
            </tr>
            <tr>
              <td><code>COLLATE</code></td>
              <td>Regles d'ordenació i comparació. Determina com es comparen els textos (sensible a majúscules, accents, etc.).</td>
              <td><code>COLLATE utf8mb4_unicode_ci</code></td>
            </tr>
          </DataTable>

          <InfoBox type="tip" title="Recomanació professional">
            <p>
              Sempre utilitza <code>utf8mb4</code> com a charset. L'antic <code>utf8</code> de MySQL
              només suporta 3 bytes i no pot emmagatzemar alguns caràcters Unicode com emojis o símbols especials.
            </p>
          </InfoBox>

          <CodeBlock label="SQL — Exemple complet recomanat" code={SQL.crearBdComplet} />

          <h4>USE</h4>
          <p>
            Selecciona una base de dades per treballar-hi. Totes les operacions posteriors (crear taules,
            inserir dades, consultes) s'executaran sobre aquesta BD fins que en seleccionis una altra o
            tanquis la connexió.
          </p>
          <CodeBlock label="SQL" code={SQL.useBd} />

          <InfoBox type="warning" title="Important">
            <p>
              Si no executes <code>USE</code> abans de crear taules o fer consultes, MySQL no sabrà on
              fer l'operació i retornarà l'error: <code>No database selected</code>.
            </p>
          </InfoBox>

          <h4>Altres comandes útils</h4>
          <CodeBlock label="SQL — Gestió de bases de dades" code={SQL.gestiobd} />

          <InfoBox type="danger" title="Perill: DROP DATABASE">
            <p>
              <code>DROP DATABASE</code> elimina permanentment la base de dades i{' '}
              <strong>totes les taules i dades que conté</strong>. Aquesta acció és irreversible.
              No hi ha confirmació ni paperera de reciclatge. Utilitza-ho amb molta precaució,
              especialment en entorns de producció.
            </p>
          </InfoBox>
        </section>

        {/* ── NUMÈRICS ── */}
        <section id="numerics">
          <h2>Tipus de Dades Numèrics</h2>
          <p>
            MySQL ofereix diversos tipus per emmagatzemar números. Escollir el tipus correcte és crucial
            per optimitzar l'espai d'emmagatzematge i garantir que les dades es guardin correctament.
          </p>

          <h3>Números Enters (Integers)</h3>
          <CodeBlock label="SQL — Exemple de tipus enters" code={SQL.enters} />

          <DataTable headers={['Tipus', 'Bytes', 'Rang SIGNED', 'Rang UNSIGNED', "Cas d'ús"]}>
            <tr>
              <td><code>TINYINT</code></td>
              <td>1</td>
              <td>-128 a 127</td>
              <td>0 a 255</td>
              <td>Edats, puntuacions petites, booleans</td>
            </tr>
            <tr>
              <td><code>SMALLINT</code></td>
              <td>2</td>
              <td>-32,768 a 32,767</td>
              <td>0 a 65,535</td>
              <td>Anys, quantitats mitjanes</td>
            </tr>
            <tr>
              <td><code>MEDIUMINT</code></td>
              <td>3</td>
              <td>-8,388,608 a 8,388,607</td>
              <td>0 a 16,777,215</td>
              <td>Codis postals, IDs mitjans</td>
            </tr>
            <tr>
              <td><code>INT</code></td>
              <td>4</td>
              <td>-2,147,483,648 a 2,147,483,647</td>
              <td>0 a 4,294,967,295</td>
              <td>IDs, quantitats grans, poblacions</td>
            </tr>
            <tr>
              <td><code>BIGINT</code></td>
              <td>8</td>
              <td>±9.2 × 10<sup>18</sup></td>
              <td>0 a 1.8 × 10<sup>19</sup></td>
              <td>Comptadors massius, timestamps en ms</td>
            </tr>
          </DataTable>

          <h4>SIGNED vs UNSIGNED</h4>
          <p>
            Per defecte, tots els tipus enters són <code>SIGNED</code>, és a dir, permeten valors negatius.
            Si saps que mai tindràs valors negatius (com edats, IDs, quantitats), pots usar{' '}
            <code>UNSIGNED</code> per duplicar el rang positiu.
          </p>

          <ComparisonGrid>
            <TypeCard name="TINYINT SIGNED" tag="per defecte" rangeLabels={['-128', '0', '127']}>
              <p>Permet negatius però limita el màxim a 127</p>
            </TypeCard>
            <TypeCard name="TINYINT UNSIGNED" rangeLabels={['0', '127', '255']}>
              <p>Sense negatius però arriba fins a 255</p>
            </TypeCard>
          </ComparisonGrid>

          <InfoBox type="tip" title="Quan usar UNSIGNED">
            <p>
              Utilitza <code>UNSIGNED</code> per: identificadors (IDs), edats, quantitats, comptadors,
              qualsevol valor que mai serà negatiu. A més d'augmentar el rang, comunica clarament la
              intenció del camp.
            </p>
          </InfoBox>

          <h3>Números Decimals (Punt Flotant i Precisió Fixa)</h3>
          <CodeBlock label="SQL — Exemple de tipus decimals" code={SQL.decimals} />

          <DataTable headers={['Tipus', 'Bytes', 'Precisió', 'Quan usar']}>
            <tr>
              <td><code>DECIMAL(M,D)</code></td>
              <td>Variable</td>
              <td>Exacta (M dígits totals, D decimals)</td>
              <td><strong>Diners, preus, quantitats exactes</strong></td>
            </tr>
            <tr>
              <td><code>FLOAT</code></td>
              <td>4</td>
              <td>~7 dígits significatius</td>
              <td>Càlculs científics, on petits errors són acceptables</td>
            </tr>
            <tr>
              <td><code>DOUBLE</code></td>
              <td>8</td>
              <td>~15 dígits significatius</td>
              <td>Coordenades GPS, càlculs que necessiten més precisió</td>
            </tr>
          </DataTable>

          <h4>DECIMAL(M,D) en detall</h4>
          <p>
            <code>M</code> és el nombre total de dígits (precisió) i <code>D</code> és el nombre de
            dígits després del punt decimal (escala).
          </p>
          <CodeBlock label="Exemples de DECIMAL" code={SQL.exempleDecimal} />

          <InfoBox type="danger" title="Mai FLOAT per a diners">
            <p>
              <code>FLOAT</code> i <code>DOUBLE</code> són tipus de punt flotant que poden tenir errors
              de precisió. Per exemple, <code>0.1 + 0.2</code> pot donar <code>0.30000000000000004</code>.
              Sempre utilitza <code>DECIMAL</code> per a valors monetaris o qualsevol dada que requereixi
              precisió exacta.
            </p>
          </InfoBox>

          <CodeBlock label="SQL — Demostració de l'error de FLOAT" code={SQL.floatError} />
        </section>

        {/* ── TEXT ── */}
        <section id="text">
          <h2>Tipus de Dades de Text</h2>
          <p>
            MySQL proporciona diversos tipus per emmagatzemar cadenes de caràcters, cadascun optimitzat
            per a diferents longituds i usos.
          </p>

          <h3>CHAR vs VARCHAR</h3>
          <CodeBlock label="SQL — Exemple de tipus de text" code={SQL.text} />

          <DataTable headers={['Tipus', 'Longitud màxima', 'Emmagatzematge', "Cas d'ús"]}>
            <tr>
              <td><code>CHAR(n)</code></td>
              <td>255 caràcters</td>
              <td>Sempre n bytes (omple amb espais)</td>
              <td>Codis fixos: país, NIF, codi postal</td>
            </tr>
            <tr>
              <td><code>VARCHAR(n)</code></td>
              <td>65,535 caràcters*</td>
              <td>Longitud real + 1-2 bytes</td>
              <td>Noms, emails, textos curts variables</td>
            </tr>
            <tr>
              <td><code>TINYTEXT</code></td>
              <td>255 caràcters</td>
              <td>Longitud + 1 byte</td>
              <td>Missatges curts</td>
            </tr>
            <tr>
              <td><code>TEXT</code></td>
              <td>65,535 caràcters</td>
              <td>Longitud + 2 bytes</td>
              <td>Descripcions, comentaris</td>
            </tr>
            <tr>
              <td><code>MEDIUMTEXT</code></td>
              <td>16 MB</td>
              <td>Longitud + 3 bytes</td>
              <td>Articles, biografies</td>
            </tr>
            <tr>
              <td><code>LONGTEXT</code></td>
              <td>4 GB</td>
              <td>Longitud + 4 bytes</td>
              <td>Llibres, logs massius</td>
            </tr>
          </DataTable>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            * La longitud real de VARCHAR depèn del charset. Amb utf8mb4 (4 bytes/caràcter), el màxim pràctic és ~16,383 caràcters.
          </p>

          <h3>Diferència visual entre CHAR i VARCHAR</h3>

          <div className="diagram">
            <div className="diagram-title">CHAR(10) vs VARCHAR(10) emmagatzemant "Hola"</div>

            <div className="char-row">
              <span className="char-row-label">CHAR(10)</span>
              <div className="char-boxes">
                {['H','o','l','a'].map((c, i) => (
                  <div key={i} className="char-box filled">{c}</div>
                ))}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="char-box empty">·</div>
                ))}
              </div>
              <span className="char-row-note">→ Sempre ocupa 10 bytes (omple amb espais)</span>
            </div>

            <div className="char-row">
              <span className="char-row-label">VARCHAR(10)</span>
              <div className="char-boxes">
                <div className="char-box meta">4</div>
                {['H','o','l','a'].map((c, i) => (
                  <div key={i} className="char-box filled">{c}</div>
                ))}
              </div>
              <span className="char-row-note">→ Només 5 bytes (1 longitud + 4 dades)</span>
            </div>
          </div>

          <InfoBox type="info" title="Quan usar CHAR vs VARCHAR">
            <p>
              <strong>CHAR:</strong> quan la longitud és sempre fixa (codis de país, DNI, codis postals).
              És més ràpid en cerques perquè MySQL sap exactament on comença cada registre.
            </p>
            <p>
              <strong>VARCHAR:</strong> quan la longitud varia (noms, emails, descripcions). Estalvia
              espai però té una petita sobrecàrrega per guardar la longitud.
            </p>
          </InfoBox>

          <h3>TEXT i variants</h3>
          <p>
            Els tipus TEXT s'emmagatzemen fora de la fila principal de la taula, el que els fa adequats
            per a textos llargs però menys eficients per a cerques.
          </p>
          <InfoBox type="warning" title="Limitacions de TEXT">
            <p>
              Els camps TEXT no poden tenir valors per defecte, no es poden indexar completament (només
              els primers N caràcters), i són més lents en ordenacions. Si el teu text cabrà en 255
              caràcters o menys, utilitza <code>VARCHAR</code>.
            </p>
          </InfoBox>
        </section>

        {/* ── DATA / HORA ── */}
        <section id="data-hora">
          <h2>Tipus de Dades de Data i Hora</h2>
          <CodeBlock label="SQL — Exemple de tipus temporals" code={SQL.dates} />

          <DataTable headers={['Tipus', 'Format', 'Rang', 'Bytes', "Cas d'ús"]}>
            <tr>
              <td><code>DATE</code></td>
              <td><code>'AAAA-MM-DD'</code></td>
              <td>1000-01-01 a 9999-12-31</td>
              <td>3</td>
              <td>Dates de naixement, venciments</td>
            </tr>
            <tr>
              <td><code>TIME</code></td>
              <td><code>'HH:MM:SS'</code></td>
              <td>-838:59:59 a 838:59:59</td>
              <td>3</td>
              <td>Durades, horaris</td>
            </tr>
            <tr>
              <td><code>DATETIME</code></td>
              <td><code>'AAAA-MM-DD HH:MM:SS'</code></td>
              <td>1000-01-01 a 9999-12-31</td>
              <td>8</td>
              <td>Esdeveniments, registres</td>
            </tr>
            <tr>
              <td><code>TIMESTAMP</code></td>
              <td><code>'AAAA-MM-DD HH:MM:SS'</code></td>
              <td>1970-01-01 a 2038-01-19</td>
              <td>4</td>
              <td>Auditoria, última modificació</td>
            </tr>
            <tr>
              <td><code>YEAR</code></td>
              <td><code>AAAA</code></td>
              <td>1901 a 2155</td>
              <td>1</td>
              <td>Anys d'edició, fabricació</td>
            </tr>
          </DataTable>

          <h3>DATETIME vs TIMESTAMP</h3>
          <p>Semblen iguals però tenen diferències importants:</p>

          <ComparisonGrid>
            <TypeCard name="DATETIME">
              <ul>
                <li>Emmagatzema la data/hora tal qual</li>
                <li>No depèn de la zona horària</li>
                <li>Rang més ampli (fins any 9999)</li>
                <li>8 bytes d'emmagatzematge</li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                Usa per: dates fixes com naixements, esdeveniments històrics
              </p>
            </TypeCard>
            <TypeCard name="TIMESTAMP">
              <ul>
                <li>Converteix a UTC al guardar</li>
                <li>Converteix a zona horària local al llegir</li>
                <li>Rang limitat (fins 2038)</li>
                <li>4 bytes d'emmagatzematge</li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                Usa per: registres d'auditoria, última modificació
              </p>
            </TypeCard>
          </ComparisonGrid>

          <CodeBlock label="SQL — TIMESTAMP amb auto-actualització" code={SQL.timestampAuto} />

          <InfoBox type="warning" title="Problema de l'any 2038">
            <p>
              TIMESTAMP utilitza un enter de 32 bits per emmagatzemar segons des de 1970-01-01. Aquest
              valor arribarà al màxim el <strong>19 de gener de 2038</strong> a les 03:14:07 UTC. Si la
              teva aplicació necessita dates posteriors, utilitza <code>DATETIME</code>.
            </p>
          </InfoBox>

          <h3>Funcions útils de data/hora</h3>
          <CodeBlock label="SQL — Funcions de data i hora" code={SQL.funcionsData} />
        </section>

        {/* ── ALTRES ── */}
        <section id="altres">
          <h2>Altres Tipus de Dades</h2>

          <h3>BOOLEAN</h3>
          <p>
            MySQL no té un tipus BOOLEAN natiu. <code>BOOLEAN</code> és un àlies de{' '}
            <code>TINYINT(1)</code>. Els valors <code>TRUE</code> i <code>FALSE</code> es converteixen
            a 1 i 0 respectivament.
          </p>
          <CodeBlock label="SQL — Booleans a MySQL" code={SQL.booleans} />

          <h3>ENUM</h3>
          <p>
            ENUM permet definir una llista de valors permesos. Només es pot emmagatzemar un dels
            valors de la llista (o NULL si es permet).
          </p>
          <CodeBlock label="SQL — ENUM" code={SQL.enum} />

          <InfoBox type="info" title="Avantatges i desavantatges d'ENUM">
            <p>
              <strong>Avantatges:</strong> validació automàtica, emmagatzematge eficient (1-2 bytes),
              codi més llegible.
            </p>
            <p>
              <strong>Desavantatges:</strong> modificar la llista requereix <code>ALTER TABLE</code>,
              l'ordre dels valors importa internament, pot ser problemàtic en migracions.
            </p>
          </InfoBox>

          <h3>SET</h3>
          <p>SET és similar a ENUM però permet múltiples valors simultàniament.</p>
          <CodeBlock label="SQL — SET" code={SQL.set} />

          <h3>NULL</h3>
          <p>
            NULL representa l'absència de valor. No és zero, no és una cadena buida,
            és "res" o "desconegut".
          </p>
          <CodeBlock label="SQL — Treballant amb NULL" code={SQL.null} />

          <InfoBox type="danger" title="NULL no és igual a res">
            <p>
              <code>NULL = NULL</code> retorna NULL, no TRUE. Sempre utilitza{' '}
              <code>IS NULL</code> o <code>IS NOT NULL</code> per comparar. Aquesta és una font molt
              comuna d'errors en SQL.
            </p>
          </InfoBox>
        </section>

        {/* ── CREAR TAULES ── */}
        <section id="crear-taules">
          <h2>Crear Taules amb Tipus de Dades</h2>
          <p>
            Ara que coneixem tots els tipus de dades, vegem com crear una taula completa
            amb restriccions i bones pràctiques.
          </p>

          <h3>Exemple complet: Taula de Productes</h3>
          <CodeBlock label="SQL — Crear taula Products" code={SQL.crearTaulaProducts} />

          <h3>Exemple complet: Taula d'Empleats</h3>
          <CodeBlock label="SQL — Crear taula Employees" code={SQL.crearTaulaEmployees} />

          <h3>Inserir dades d'exemple</h3>
          <CodeBlock label="SQL — Inserir dades a Products" code={SQL.insertProducts} />
          <CodeBlock label="SQL — Inserir dades a Employees" code={SQL.insertEmployees} />

          <h3>Restriccions (Constraints)</h3>
          <DataTable headers={['Restricció', 'Descripció', 'Exemple']}>
            <tr>
              <td><code>PRIMARY KEY</code></td>
              <td>Identificador únic de cada registre. No pot ser NULL ni duplicat.</td>
              <td><code>id INT PRIMARY KEY</code></td>
            </tr>
            <tr>
              <td><code>AUTO_INCREMENT</code></td>
              <td>Genera automàticament un valor seqüencial (1, 2, 3…)</td>
              <td><code>id INT AUTO_INCREMENT</code></td>
            </tr>
            <tr>
              <td><code>NOT NULL</code></td>
              <td>El camp no pot quedar buit</td>
              <td><code>nom VARCHAR(50) NOT NULL</code></td>
            </tr>
            <tr>
              <td><code>UNIQUE</code></td>
              <td>No permet valors duplicats (però sí múltiples NULLs)</td>
              <td><code>email VARCHAR(100) UNIQUE</code></td>
            </tr>
            <tr>
              <td><code>DEFAULT</code></td>
              <td>Valor per defecte si no s'especifica</td>
              <td><code>actiu BOOLEAN DEFAULT TRUE</code></td>
            </tr>
            <tr>
              <td><code>UNSIGNED</code></td>
              <td>Només valors positius (duplica el rang positiu)</td>
              <td><code>edat TINYINT UNSIGNED</code></td>
            </tr>
            <tr>
              <td><code>CHECK</code></td>
              <td>Condició que han de complir els valors (MySQL 8.0+)</td>
              <td><code>edat INT CHECK (edat &gt;= 0)</code></td>
            </tr>
          </DataTable>

          <InfoBox type="tip" title="Bones pràctiques al crear taules">
            <ol>
              <li>Sempre defineix una <code>PRIMARY KEY</code>, preferiblement <code>INT UNSIGNED AUTO_INCREMENT</code>.</li>
              <li>Usa <code>NOT NULL</code> per camps obligatoris.</li>
              <li>Usa <code>DECIMAL</code> per diners, mai <code>FLOAT</code>.</li>
              <li>Afegeix camps <code>CreatedAt</code> i <code>UpdatedAt</code> per auditoria.</li>
              <li>Usa <code>CHAR</code> per longituds fixes, <code>VARCHAR</code> per variables.</li>
              <li>Escull el tipus enter més petit que cobreixi les teves necessitats.</li>
            </ol>
          </InfoBox>
        </section>

      </div>
    </>
  )
}
