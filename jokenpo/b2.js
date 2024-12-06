const fs = require('fs');
const path = require('path');

// Função para processar e formatar a estrutura com caminhos completos
function processStructure(structure, currentPath = '') {
  let output = '';

  if (structure.type === 'directory') {
    const dirPath = currentPath ? path.join(currentPath, structure.name) : structure.name;
    if (structure.children) {
      structure.children.forEach(child => {
        output += processStructure(child, dirPath);
      });
    }
  } else if (structure.type === 'file') {
    const filePath = currentPath ? path.join(currentPath, structure.name) : structure.name;
    output += `${filePath}\n`;
    if (structure.content) {
      output += `${structure.content}\n\n`;
    }
  }

  return output;
}

// Função principal para gerar saída com caminhos completos
function generateFullPathOutput(inputPath, outputPath) {
  try {
    const rawData = fs.readFileSync(inputPath, 'utf-8');
    const projectStructure = JSON.parse(rawData);

    // Processar e formatar estrutura
    const formattedOutput = processStructure(projectStructure.root, '');

    // Salvar no arquivo
    fs.writeFileSync(outputPath, formattedOutput, 'utf-8');
    console.log(`Arquivo legível salvo em: ${outputPath}`);
  } catch (error) {
    console.error('Erro ao processar:', error.message);
  }
}

// Caminhos de entrada e saída
const inputPath = path.join(process.cwd(), 'project-structure.json');
const outputPath = path.join(process.cwd(), 'project-structure-full-path.txt');

// Executar função
generateFullPathOutput(inputPath, outputPath);
