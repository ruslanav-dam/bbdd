// ═══════════════════════════════════════════════════════════════════════════
// EXAM DATA — Mòdul 2: Consultes SQL Avançades
// ═══════════════════════════════════════════════════════════════════════════

export const EXAM = {
  slug:      'modul2-sql-2526',
  title:     'Examen SQL — Mòdul 2',
  subtitle:  "Funcions d'agregació · GROUP BY · HAVING · DISTINCT · ORDER BY",
  course:    '0484 Bases de Dades · DAM 2025-2026',
  timeLimit: 30 * 60,   // segons
  totalQ:    20,
  parts: [
    { id: 'A', label: "Part A — Test d'opció múltiple",   pts: '0.5 pts × 8', qNums: [1,2,3,4,5,6,7,8] },
    { id: 'B', label: 'Part B — Completar el codi SQL',   pts: '0.25 pts × 6', qNums: [9,10,11,12,13,14] },
    { id: 'C', label: 'Part C — Interpretar resultats',    pts: '0.5 pts × 3', qNums: [15,16,17] },
    { id: 'D', label: 'Part D — Escriure consultes SQL',   pts: '1 pt × 3',    qNums: [18,19,20] },
  ],
}

// ── MC Questions ──────────────────────────────────────────────────────────────
// nums: 1-8 (Part A) + 15-17 (Part C)

export const MC_QUESTIONS = {
  1: {
    text: "Quina funció SQL calcula automàticament la <strong>mitjana</strong> dels valors d'una columna?",
    options: {
      A: '<code>MEAN(camp)</code>',
      B: '<code>SUM(camp) / COUNT(*)</code> — no hi ha funció directa',
      C: '<code>AVG(camp)</code>',
      D: '<code>MEDIAN(camp)</code>',
    },
    correct: 'C',
    feedback: {
      C: 'Correcte! <code>AVG(camp)</code> = average = mitjana en anglès.',
      A: 'Incorrecte. <code>MEAN()</code> no existeix a MySQL.',
      B: 'Incorrecte. <code>AVG()</code> sí existeix i és exactament equivalent.',
      D: 'Incorrecte. <code>MEDIAN()</code> no és una funció estàndard de MySQL.',
    },
  },
  2: {
    text: 'Observa la consulta. Quantes files retornarà si la taula <code>Products</code> té 8 productes distribuïts entre 3 proveïdors?',
    code: 'SELECT SupplierID, COUNT(*) AS Total\nFROM Products\nGROUP BY SupplierID;',
    options: {
      A: '8 files (una per producte)',
      B: '1 fila (el total global)',
      C: '3 files (una per proveïdor)',
      D: 'Error: falta la clàusula WHERE',
    },
    correct: 'C',
    feedback: {
      C: 'Correcte! <code>GROUP BY SupplierID</code> crea un grup per cada proveïdor únic → 3 files.',
      A: 'Incorrecte. GROUP BY agrupa i redueix les files.',
      B: "Incorrecte. Sense GROUP BY seria 1 fila, però aquí l'agrupació crea 3.",
      D: 'Incorrecte. La consulta és vàlida sense WHERE.',
    },
  },
  3: {
    text: 'Quina és la diferència fonamental entre <code>WHERE</code> i <code>HAVING</code>?',
    options: {
      A: "Són sinònims, s'utilitzen de manera intercanviable",
      B: '<code>WHERE</code> filtra files individuals <em>abans</em> d\'agrupar; <code>HAVING</code> filtra grups <em>després</em> de GROUP BY',
      C: '<code>HAVING</code> s\'usa sense GROUP BY; <code>WHERE</code> s\'usa sempre amb GROUP BY',
      D: '<code>WHERE</code> va al final de la consulta; <code>HAVING</code> va al principi',
    },
    correct: 'B',
    feedback: {
      B: 'Correcte! WHERE filtra files individuals ABANS de GROUP BY. HAVING filtra grups DESPRÉS.',
      A: 'Incorrecte. Són clàusules molt diferents, NO intercanviables.',
      C: 'Incorrecte. HAVING sempre va AMB GROUP BY.',
      D: 'Incorrecte. WHERE va ABANS de GROUP BY, no al final.',
    },
  },
  4: {
    text: 'La taula <code>Manufacturers</code> conté: Apple, Samsung, Apple, Logitech, Apple, Samsung. Quants resultats retorna?',
    code: 'SELECT DISTINCT Name FROM Manufacturers;',
    options: {
      A: '6 files',
      B: '3 files (Apple, Samsung, Logitech)',
      C: '1 fila',
      D: 'Error: DISTINCT no funciona amb text',
    },
    correct: 'B',
    feedback: {
      B: 'Correcte! DISTINCT elimina duplicats: Apple(x3)→1, Samsung(x2)→1, Logitech(x1)→1 = 3 files.',
      A: 'Incorrecte. DISTINCT elimina repeticions.',
      C: 'Incorrecte. Hi ha 3 valors únics.',
      D: 'Incorrecte. DISTINCT funciona amb qualsevol tipus de dada.',
    },
  },
  5: {
    text: 'Per quin motiu aquesta consulta <strong>donarà error</strong> en MySQL (mode estricte)?',
    code: 'SELECT ProductName, AVG(Price) FROM Products;',
    options: {
      A: "Perquè AVG no existeix, cal escriure AVERAGE",
      B: 'Perquè falta la clàusula WHERE',
      C: 'Perquè es barreja una columna normal (<code>ProductName</code>) amb una funció d\'agregació sense GROUP BY',
      D: 'Perquè SELECT * és obligatori quan s\'usa AVG',
    },
    correct: 'C',
    feedback: {
      C: 'Correcte! No es pot barrejar <code>ProductName</code> (camp individual) amb <code>AVG(Price)</code> (agregació) sense GROUP BY.',
      A: 'Incorrecte. <code>AVG()</code> existeix perfectament.',
      B: 'Incorrecte. WHERE és opcional i no és el problema.',
      D: 'Incorrecte. AVG no necessita SELECT *.',
    },
  },
  6: {
    text: "Quin és l'ordre <strong>obligatori</strong> de les clàusules en una consulta SQL completa?",
    options: {
      A: 'FROM → WHERE → SELECT → GROUP BY → HAVING → ORDER BY',
      B: 'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
      C: 'SELECT → WHERE → FROM → HAVING → GROUP BY → ORDER BY',
      D: "L'ordre no importa, MySQL el reorganitza automàticament",
    },
    correct: 'B',
    feedback: {
      B: "Correcte! L'ordre és: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.",
      A: 'Incorrecte. SELECT ha d\'anar primer, no FROM.',
      C: 'Incorrecte. WHERE ha d\'anar ABANS de GROUP BY.',
      D: "Incorrecte. L'ordre importa molt; MySQL llegeix les clàusules en ordre fix.",
    },
  },
  7: {
    text: 'Analitza el resultat. Quina afirmació és <strong>correcta</strong>?',
    code: 'SELECT SupplierID, COUNT(*) AS Productes\nFROM Products\nGROUP BY SupplierID\nHAVING COUNT(*) > 2;\n\n-- Resultat: SupplierID 1 → 3 productes | SupplierID 3 → 3 productes',
    options: {
      A: 'El SupplierID 2 té 0 productes',
      B: 'El SupplierID 2 té 2 o menys productes i per això HAVING l\'ha exclòs',
      C: "S'han esborrat els registres del SupplierID 2",
      D: 'La consulta ha ignorat el SupplierID 2 per error',
    },
    correct: 'B',
    feedback: {
      B: 'Correcte! HAVING COUNT(*) > 2 exclou els proveïdors amb 2 o menys productes.',
      A: 'Incorrecte. El proveïdor 2 sí existeix a la taula, simplement no compleix la condició HAVING.',
      C: 'Incorrecte. HAVING no esborra dades.',
      D: "Incorrecte. No hi ha error; és el comportament esperat de HAVING.",
    },
  },
  8: {
    text: 'La taula <code>Orders</code> té 500 files. Quantes files retornarà aproximadament si la botiga té 80 clients únics?',
    code: 'SELECT DISTINCT CustomerID FROM Orders;',
    options: {
      A: '500 files (totes les comandes)',
      B: '1 fila (el total agregat)',
      C: 'Màxim 80 files (un ID únic per client)',
      D: '500 / 80 = 6 files',
    },
    correct: 'C',
    feedback: {
      C: 'Correcte! DISTINCT retorna cada CustomerID una sola vegada → màxim 80.',
      A: 'Incorrecte. DISTINCT elimina repeticions.',
      B: 'Incorrecte. DISTINCT no agrega, no retorna 1 fila.',
      D: 'Incorrecte. DISTINCT no fa divisions.',
    },
  },
  15: {
    text: "La consulta i el resultat. Quina conclusió és <strong>correcta</strong>?",
    code: "SELECT AVG(Price) AS Mitja, SUM(Price) AS Total, COUNT(*) AS Quants\nFROM Products\nWHERE SupplierID = 1;\n\n-- Resultat: Mitja = 15.66 | Total = 47 | Quants = 3",
    options: {
      A: "El proveïdor 1 té 3 productes que sumen 47€ i la seva mitjana de preu és 15.66€",
      B: 'Tots els productes de la taula sumen 47€',
      C: 'Hi ha 3 proveïdors a la taula',
      D: 'El preu màxim del proveïdor 1 és 15.66€',
    },
    correct: 'A',
    feedback: {
      A: 'Correcte! WHERE SupplierID = 1 filtra 3 productes d\'aquell proveïdor. AVG=15.66, SUM=47, COUNT=3.',
      B: 'Incorrecte. El WHERE filtra i el total és només del proveïdor 1.',
      C: 'Incorrecte. COUNT(*) compta productes, no proveïdors.',
      D: 'Incorrecte. AVG és la mitjana, no el màxim.',
    },
  },
  16: {
    text: 'La taula <code>Employees</code> té registres amb Salary de: 800, 1200, 2500, 3000, 1800. Quin valor retorna?',
    code: 'SELECT COUNT(*) AS Total\nFROM Employees\nWHERE Salary > 1500;',
    options: {
      A: 'Total = 5',
      B: 'Total = 3',
      C: 'Total = 7300 (la suma)',
      D: 'Total = 1460 (la mitjana)',
    },
    correct: 'B',
    feedback: {
      B: 'Correcte! Salaris > 1500: 2500, 3000, 1800 → COUNT = 3.',
      A: 'Incorrecte. WHERE Salary > 1500 elimina 800 i 1200.',
      C: 'Incorrecte. COUNT compta files, no suma valors.',
      D: 'Incorrecte. COUNT retorna el nombre de files, no la mitjana.',
    },
  },
  17: {
    text: "Quina diferència hi ha entre el resultat A i el resultat B?",
    code: "-- Consulta A\nSELECT SupplierID, AVG(Price) AS Mitja FROM Products\nGROUP BY SupplierID HAVING AVG(Price) > 20;\n\n-- Consulta B\nSELECT SupplierID, AVG(Price) AS Mitja FROM Products\nWHERE Price > 20 GROUP BY SupplierID;",
    options: {
      A: 'Són idèntiques, produeixen el mateix resultat sempre',
      B: 'A mostra proveïdors on la <em>mitjana del grup</em> supera 20€; B calcula la mitjana excloent productes ≤20€',
      C: 'B donarà error perquè WHERE no pot anar davant de GROUP BY',
      D: 'A donarà error perquè HAVING no pot usar funcions d\'agregació',
    },
    correct: 'B',
    feedback: {
      B: 'Correcte! A filtra GRUPS on la mitjana>20 (HAVING). B filtra FILES amb preu>20 ABANS de calcular la mitjana (WHERE).',
      A: 'Incorrecte. Produeixen resultats completament diferents.',
      C: 'Incorrecte. WHERE ABANS de GROUP BY és sintaxi vàlida.',
      D: 'Incorrecte. HAVING amb AVG() és perfectament vàlid.',
    },
  },
}

// ── Fill-in-the-blank Questions ───────────────────────────────────────────────
// codeTemplate: {0}, {1}... → posicions dels inputs

export const FILL_QUESTIONS = [
  {
    qNum: 9,
    text: "Completa per obtenir el <strong>preu mitjà</strong> de tots els productes:",
    codeTemplate: "SELECT {0}(Price) AS PreuMitja\nFROM Products;",
    inputs: [{ id: 'fi9a', answer: 'AVG', width: 6 }],
    feedback: "La funció correcta és <code>AVG(Price)</code>. AVG = average (anglès) = mitjana.",
  },
  {
    qNum: 10,
    text: "Completa per comptar productes per categoria mostrant <strong>només</strong> les categories amb <strong>més de 3</strong> productes:",
    codeTemplate: "SELECT CategoryID, COUNT(*) AS Total\nFROM Products\nGROUP BY CategoryID\n{0} COUNT(*) > {1};",
    inputs: [
      { id: 'fi10a', answer: 'HAVING', width: 8 },
      { id: 'fi10b', answer: '3',      width: 3 },
    ],
    feedback: "Cal <code>HAVING COUNT(*) > 3</code>. HAVING filtra grups; no confondre amb WHERE que filtra files.",
  },
  {
    qNum: 11,
    text: "Completa per llistar productes ordenats per preu de <strong>major a menor</strong>:",
    codeTemplate: "SELECT Name, Price FROM Products\nORDER BY Price {0};",
    inputs: [{ id: 'fi11a', answer: 'DESC', width: 6 }],
    feedback: "<code>DESC</code> = descendent = de major a menor. <code>ASC</code> seria de menor a major (el defecte).",
  },
  {
    qNum: 12,
    text: "Completa per obtenir el total de salaris per departament, <strong>excloent</strong> del càlcul els empleats amb salari inferior a 1500€:",
    codeTemplate: "SELECT Department, SUM(Salary) AS TotalSalaris\nFROM Employees\n{0} Salary >= 1500\nGROUP BY Department;",
    inputs: [{ id: 'fi12a', answer: 'WHERE', width: 7 }],
    feedback: "<code>WHERE Salary >= 1500</code> filtra files ABANS de GROUP BY. No es pot usar HAVING aquí.",
  },
  {
    qNum: 13,
    text: "Completa per obtenir el <strong>màxim i mínim</strong> de preus amb els àlies indicats:",
    codeTemplate: "SELECT {0}(Price) AS MesCar, {1}(Price) AS MesBarat\nFROM Products;",
    inputs: [
      { id: 'fi13a', answer: 'MAX', width: 5 },
      { id: 'fi13b', answer: 'MIN', width: 5 },
    ],
    feedback: "<code>MAX(Price)</code> retorna el valor més gran i <code>MIN(Price)</code> el més petit.",
  },
  {
    qNum: 14,
    text: "Completa per obtenir els <strong>5 productes més cars</strong>:",
    codeTemplate: "SELECT Name, Price FROM Products\nORDER BY Price {0}\n{1} 5;",
    inputs: [
      { id: 'fi14a', answer: 'DESC',  width: 6 },
      { id: 'fi14b', answer: 'LIMIT', width: 7 },
    ],
    feedback: "<code>ORDER BY Price DESC</code> ordena de car a barat. <code>LIMIT 5</code> agafa els 5 primers.",
  },
]

// ── Write Questions ───────────────────────────────────────────────────────────

export const WRITE_QUESTIONS = [
  {
    qNum: 18,
    text: `Utilitza la taula <strong>Products</strong> amb els camps:<br>
      <code>Code</code> INT (PK), <code>Name</code> VARCHAR(100), <code>Price</code> DECIMAL(10,2), <code>Manufacturer</code> INT (FK)<br><br>
      Escriu la consulta per obtenir el <strong>nombre de productes per fabricant</strong>, mostrant únicament els fabricants que tinguin <strong>més de 1 producte</strong>. Mostra el camp <code>Manufacturer</code> i el recompte amb l'àlies <code>Total</code>.`,
    placeholder: "SELECT ...\nFROM ...\nGROUP BY ...\nHAVING ...",
    required: [
      ['select', 'manufacturer', 'count'],
      ['from', 'product'],
      ['group by', 'manufacturer'],
      ['having', 'count', '>', '1'],
    ],
    feedback: `Solució esperada:<br>
      <code>SELECT Manufacturer, COUNT(*) AS Total<br>
      FROM Products<br>
      GROUP BY Manufacturer<br>
      HAVING COUNT(*) > 1;</code>`,
  },
  {
    qNum: 19,
    text: `Utilitza la taula <strong>Employees</strong>:<br>
      <code>Code</code> INT (PK), <code>Name</code> VARCHAR(100), <code>Department</code> VARCHAR(50), <code>Salary</code> DECIMAL(10,2), <code>HireDate</code> DATE<br><br>
      Escriu la consulta per obtenir el <strong>salari màxim, mínim i mitjà</strong> per departament, ordenat pel <strong>salari mitjà de manera descendent</strong>. Usa els àlies <code>SalariMax</code>, <code>SalariMin</code> i <code>SalariMitja</code>.`,
    placeholder: "SELECT ...\nFROM ...\nGROUP BY ...\nORDER BY ...",
    required: [
      ['select', 'max', 'min', 'avg'],
      ['from', 'employee'],
      ['group by', 'department'],
      ['order by', 'desc'],
    ],
    feedback: `Solució esperada:<br>
      <code>SELECT Department, MAX(Salary) AS SalariMax, MIN(Salary) AS SalariMin, AVG(Salary) AS SalariMitja<br>
      FROM Employees<br>
      GROUP BY Department<br>
      ORDER BY SalariMitja DESC;</code>`,
  },
  {
    qNum: 20,
    text: `Utilitza les taules <strong>Products</strong> i <strong>Manufacturers</strong>. <strong>Sense usar JOIN</strong>, escriu <strong>dues consultes separades</strong>:<br><br>
      <strong>(a)</strong> Tots els productes amb preu <strong>entre 20€ i 100€</strong>, ordenats per preu ascendent.<br>
      <strong>(b)</strong> La suma total de preus (<code>TotalPreus</code>) i la mitjana (<code>PreuMitja</code>) dels productes del fabricant amb <code>Code = 3</code>.`,
    placeholder: "-- Consulta a)\nSELECT ...\n\n-- Consulta b)\nSELECT ...",
    required: [
      ['select', 'price', 'between', '20', '100'],
      ['order by', 'price'],
      ['select', 'sum', 'avg'],
      ['manufacturer', '=', '3'],
    ],
    feedback: `Solució esperada:<br>
      <code>-- a)<br>
      SELECT * FROM Products WHERE Price BETWEEN 20 AND 100 ORDER BY Price ASC;<br><br>
      -- b)<br>
      SELECT SUM(Price) AS TotalPreus, AVG(Price) AS PreuMitja<br>
      FROM Products WHERE Manufacturer = 3;</code>`,
  },
]

// ── Scoring helpers ───────────────────────────────────────────────────────────

export function gradeMC(qNum, userAnswer) {
  const correct = MC_QUESTIONS[qNum]?.correct
  return userAnswer === correct
}

export function gradeFill(fillCfg, userValues) {
  return fillCfg.inputs.every(
    inp => (userValues[inp.id] || '').trim().toUpperCase() === inp.answer.toUpperCase()
  )
}

export function gradeWrite(writeCfg, userText) {
  const lower = (userText || '').toLowerCase()
  const passed = writeCfg.required.filter(group => group.every(kw => lower.includes(kw))).length
  const ratio  = passed / writeCfg.required.length
  if (ratio >= 0.75) return { correct: true,  partial: false, pts: 1.0 }
  if (ratio >= 0.5)  return { correct: false, partial: true,  pts: 0.5 }
  return { correct: false, partial: false, pts: 0 }
}

export function calcTotalScore(mcAnswers, fillValues, writeValues) {
  let total = 0

  // MC (parts A + C)
  ;[...Array(8).keys()].map(i => i + 1).concat([15, 16, 17]).forEach(n => {
    if (gradeMC(n, mcAnswers[n])) total += 0.5
  })

  // Fill (part B)
  FILL_QUESTIONS.forEach(cfg => {
    if (gradeFill(cfg, fillValues)) total += 0.25
  })

  // Write (part D)
  WRITE_QUESTIONS.forEach(cfg => {
    total += gradeWrite(cfg, writeValues[cfg.qNum]).pts
  })

  return Math.min(10, total)
}
