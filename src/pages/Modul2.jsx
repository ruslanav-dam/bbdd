import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'
import DataTable from '../components/DataTable'

// ─── SQL code strings ────────────────────────────────────────────────────────

const SQL = {
  sum: `-- Quant sumen tots els preus?
SELECT SUM(Price) AS TotalPreus
FROM Products;
-- TotalPreus: 185.35`,

  count: `SELECT COUNT(*) AS TotalProductes
FROM Products;
-- TotalProductes: 8`,

  avg: `SELECT AVG(Price) AS PreuMitja
FROM Products;
-- PreuMitja: 23.1687

-- Equivalent manual (dóna el mateix):
SELECT SUM(Price) / COUNT(*) AS PreuMitja
FROM Products;`,

  maxMin: `SELECT MAX(Price) AS MesCar, MIN(Price) AS MesBarat
FROM Products;
-- MesCar: 40  |  MesBarat: 10`,

  agregacioError: `-- INCORRECTE: ProductName no forma part de cap agrupació
SELECT ProductName, AVG(Price) FROM Products; -- ERROR!

-- CORRECTE: agrupar per ProductName
SELECT ProductName, AVG(Price) AS PreuMitja
FROM Products
GROUP BY ProductName;`,

  alias: `-- Sense AS: columna = "SUM(Price)/COUNT(*)" → impossible de llegir
SELECT SUM(Price) / COUNT(*) FROM Products;

-- Amb AS: ara la columna es diu "PreuMitja"
SELECT SUM(Price) / COUNT(*) AS PreuMitja FROM Products;

-- Si l'àlies té espais, s'enclouen entre cometes
SELECT ProductName AS Producte, Price AS "Preu (€)"
FROM Products;`,

  groupBy: `-- Quants productes té cada proveïdor?
SELECT SupplierID, COUNT(*) AS Productes
FROM Products
GROUP BY SupplierID;
-- SupplierID 1 → 3 productes
-- SupplierID 2 → 2 productes
-- SupplierID 3 → 3 productes

-- Agrupar per dos camps alhora
SELECT SupplierID, CategoryID, COUNT(*) AS Productes
FROM Products
GROUP BY SupplierID, CategoryID;`,

  distinct: `-- Sense DISTINCT: llista amb repeticions
SELECT SupplierID FROM Products;
-- 1, 1, 1, 2, 2, 3, 3, 3

-- Amb DISTINCT: valors únics
SELECT DISTINCT SupplierID FROM Products;
-- 1, 2, 3`,

  having: `-- Proveïdors amb MÉS DE 2 productes
SELECT SupplierID, COUNT(*) AS Productes
FROM Products
GROUP BY SupplierID
HAVING COUNT(*) > 2;

-- Combinant WHERE (filtra files) + HAVING (filtra grups)
SELECT SupplierID, COUNT(*) AS Productes
FROM Products
WHERE Price >= 15
GROUP BY SupplierID
HAVING COUNT(*) > 1;`,

  orderBy: `-- De menor a major (ASC és el defecte)
SELECT ProductName, Price FROM Products
ORDER BY Price;

-- De major a menor
SELECT ProductName, Price FROM Products
ORDER BY Price DESC;

-- Múltiples columnes: primer per SupplierID descendent, després per Price ascendent
SELECT ProductName, SupplierID, Price FROM Products
ORDER BY SupplierID DESC, Price ASC;`,

  ordreClausules: `SELECT   camps_o_funcions        -- Quines dades vull veure?
FROM     taula                   -- D'on les trec?
WHERE    condicio                -- Quins registres? (opcional)
GROUP BY camp                   -- Com les agrupo? (opcional)
HAVING   condicio_de_grup       -- Quins grups mostro? (opcional)
ORDER BY camp [ASC|DESC];       -- En quin ordre? (opcional)`,
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Modul2() {
  return (
    <>
      <PageHeader
        tag="Mòdul 2"
        title="Consultes SQL Avançades"
        subtitle="Funcions d'agregació, agrupació, ordenació i filtres avançats per extreure informació útil de les dades"
      />

      <div className="container">

        {/* ── AGREGACIÓ ── */}
        <section id="agregacio">
          <h2>Funcions d'Agregació</h2>
          <p>
            Fins ara les consultes retornen <strong>files individuals</strong>. Però moltes vegades
            necessitem respostes del tipus: "Quin és el preu mitjà?", "Quants productes tenim?".
            Les <strong>funcions d'agregació</strong> calculen un sol valor a partir de tots els
            registres seleccionats.
          </p>

          <InfoBox type="info" title="Analogia del món real">
            <p>
              Imagina les notes d'examen en un full de càlcul. Les funcions d'agregació fan el que
              faria un professor: <code>AVG</code> calcula la nota mitjana, <code>MAX</code> troba la
              nota més alta, <code>COUNT</code> compta quants alumnes han fet l'examen.
            </p>
          </InfoBox>

          <h3>SUM — Suma total</h3>
          <CodeBlock label="SQL — SUM" code={SQL.sum} />

          <h3>COUNT — Comptar registres</h3>
          <p>
            L'asterisc <code>*</code> significa "qualsevol camp", és a dir, compta totes les files.
          </p>
          <CodeBlock label="SQL — COUNT" code={SQL.count} />

          <h3>AVG — Mitjana (Average)</h3>
          <p>
            AVG ve de l'anglès <em>average</em>. Calcula la mitjana automàticament
            (equivalent a SUM/COUNT).
          </p>
          <CodeBlock label="SQL — AVG" code={SQL.avg} />

          <h3>MAX i MIN — Màxim i mínim</h3>
          <p>
            <strong>Atenció:</strong> retornen el valor, no el registre sencer. Per saber quin
            producte és el més car cal una subconsulta (tema avançat).
          </p>
          <CodeBlock label="SQL — MAX i MIN" code={SQL.maxMin} />

          <InfoBox type="warning" title="Error freqüent: barrejar camps normals amb agregació">
            <p>
              Seleccionar un camp que no forma part de cap agrupació donarà error en mode estricte:
            </p>
            <CodeBlock label="SQL — INCORRECTE vs CORRECTE" code={SQL.agregacioError} />
          </InfoBox>

          <DataTable headers={['Funció', 'Retorna', 'Exemple pràctic']}>
            <tr>
              <td><code>SUM(camp)</code></td>
              <td>Total acumulat</td>
              <td>Total de vendes del mes</td>
            </tr>
            <tr>
              <td><code>COUNT(*)</code></td>
              <td>Número de registres</td>
              <td>Quants clients tenim</td>
            </tr>
            <tr>
              <td><code>AVG(camp)</code></td>
              <td>Valor promig</td>
              <td>Nota mitjana dels alumnes</td>
            </tr>
            <tr>
              <td><code>MAX(camp)</code></td>
              <td>Valor més gran</td>
              <td>Producte més car</td>
            </tr>
            <tr>
              <td><code>MIN(camp)</code></td>
              <td>Valor més petit</td>
              <td>Temperatura mínima registrada</td>
            </tr>
          </DataTable>
        </section>

        {/* ── AS ── */}
        <section id="alias">
          <h2>AS — Renombrar columnes (Àlies)</h2>
          <p>
            Quan usem funcions d'agregació, MySQL dona noms poc llegibles com{' '}
            <code>SUM(Price)</code> o <code>Expr1000</code>. La paraula clau <code>AS</code> posa
            un <strong>nom net</strong> a qualsevol columna o expressió del resultat.
          </p>

          <InfoBox type="info" title="Analogia">
            <p>
              És com posar una etiqueta a un pot: el contingut és el mateix, però ara saps el que
              hi ha dins. <code>SUM(Price) AS TotalVendes</code> → l'etiqueta és "TotalVendes".
            </p>
          </InfoBox>

          <CodeBlock label="SQL — AS" code={SQL.alias} />
        </section>

        {/* ── GROUP BY ── */}
        <section id="group-by">
          <h2>GROUP BY — Agrupar dades</h2>
          <p>
            GROUP BY divideix les dades en <strong>subgrups</strong> i calcula el resultat de les
            funcions d'agregació per a cada grup per separat.
          </p>

          <InfoBox type="info" title="Analogia del supermercat">
            <p>
              Vols saber quants productes hi ha <em>per secció</em>. Sense GROUP BY obtindries un sol
              número total. Amb GROUP BY obtens una fila per cada secció amb el seu recompte.
            </p>
          </InfoBox>

          <CodeBlock label="SQL — GROUP BY" code={SQL.groupBy} />

          <InfoBox type="warning" title="Regla d'or de GROUP BY">
            <p>
              Si una columna apareix al <code>SELECT</code> <em>sense</em> funció d'agregació,{' '}
              <strong>ha d'aparèixer</strong> al <code>GROUP BY</code>. Altrament MySQL donarà error
              en mode estricte.
            </p>
          </InfoBox>
        </section>

        {/* ── DISTINCT ── */}
        <section id="distinct">
          <h2>DISTINCT — Eliminar duplicats</h2>
          <p>
            DISTINCT filtra les files repetides i retorna únicament els <strong>valors únics</strong>.
          </p>

          <InfoBox type="info" title="Analogia">
            <p>
              Tens 100 comandes i vols saber de quins països provenen. Sense DISTINCT obtindries
              100 països (molts repetits). Amb DISTINCT la llista neta de països únics.
            </p>
          </InfoBox>

          <CodeBlock label="SQL — DISTINCT" code={SQL.distinct} />
        </section>

        {/* ── HAVING ── */}
        <section id="having">
          <h2>HAVING — Filtrar grups</h2>
          <p>
            <code>WHERE</code> filtra files <em>individuals</em> abans d'agrupar.{' '}
            <code>HAVING</code> filtra <strong>grups sencers</strong> després de l'agrupació.
            Sempre va acompanyat de <code>GROUP BY</code>.
          </p>

          <InfoBox type="info" title="WHERE vs HAVING">
            <p>
              <strong>WHERE</strong> = "Quins registres entren al càlcul?" → s'aplica <em>abans</em>{' '}
              de GROUP BY, sobre files.
            </p>
            <p>
              <strong>HAVING</strong> = "Quins grups mostro?" → s'aplica <em>després</em> de GROUP BY,
              sobre els resultats calculats.
            </p>
          </InfoBox>

          <CodeBlock label="SQL — HAVING" code={SQL.having} />

          <DataTable headers={['Clàusula', "Quan s'aplica", 'Filtra', "Funcions d'agregació?"]}>
            <tr>
              <td><code>WHERE</code></td>
              <td>Abans de GROUP BY</td>
              <td>Files individuals</td>
              <td>No</td>
            </tr>
            <tr>
              <td><code>HAVING</code></td>
              <td>Després de GROUP BY</td>
              <td>Grups complets</td>
              <td>Sí</td>
            </tr>
          </DataTable>
        </section>

        {/* ── ORDER BY ── */}
        <section id="order-by">
          <h2>ORDER BY — Ordenar resultats</h2>
          <p>
            ORDER BY és sempre l'<strong>última clàusula</strong> d'una consulta. Ordena el resultat
            per una o més columnes. Per defecte és <strong>ascendent (ASC)</strong>: de menor a major,
            de A a Z.
          </p>

          <CodeBlock label="SQL — ORDER BY" code={SQL.orderBy} />

          <InfoBox type="tip" title="Ordre de les clàusules SQL — sempre en aquest ordre">
            <CodeBlock label="Ordre correcte" code={SQL.ordreClausules} />
          </InfoBox>
        </section>

      </div>
    </>
  )
}
