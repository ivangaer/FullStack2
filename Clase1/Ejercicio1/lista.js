// 📝 Lista de tareas predefinidas
const tareas = [
    "🛒 Comprar leche",
    "🏋️‍♂️ Hacer ejercicio",
    "📞 Llamar a mamá",
    "💻 Estudiar NodeJS"
];

// 🖨️ Función para mostrar las tareas
function mostrarTareas() {
    console.log('\n--- 📋 Tus Tareas ---');
    tareas.forEach((tarea, indice) => {
        console.log(`${indice + 1}. ${tarea}`);
    });
    console.log('\n¡Tú puedes! 💪✨');
}

// 🚀 Mostrar las tareas al ejecutar el programa
mostrarTareas();