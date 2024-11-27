const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/courses', (req, res) => {
  fs.readFile('signatureData.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }
    res.json(JSON.parse(data));
  });
});

app.put('/courses/:id/asistencias', (req, res) => {
  const courseId = req.params.id;
  const { asistencias } = req.body;

  fs.readFile('signatureData.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }

    let courses = JSON.parse(data);
    let course = courses.find(c => c.id === courseId);
    
    if (course) {
      course.asistencias = asistencias;

      fs.writeFile('signatureData.json', JSON.stringify(courses, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al guardar las asistencias' });
        }
        res.json({ message: 'Asistencias actualizadas correctamente', course });
      });
    } else {
      res.status(404).json({ message: 'Ramo no encontrado' });
    }
  });
});

app.put('/courses/:id/attendanceRate', (req, res) => {
  const courseId = req.params.id;
  const { attendanceRate } = req.body;

  fs.readFile('signatureData.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }

    let courses = JSON.parse(data);
    let course = courses.find(c => c.id === courseId);
    
    if (course) {
      course.attendanceRate = attendanceRate;

      fs.writeFile('signatureData.json', JSON.stringify(courses, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al guardar el porcentaje de asistencia' });
        }
        res.json({ message: 'Porcentaje de asistencia actualizado correctamente', course });
      });
    } else {
      res.status(404).json({ message: 'Ramo no encontrado' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
