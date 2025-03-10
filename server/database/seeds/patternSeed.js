const patterns = [
  {
    name: 'A-line Dress Pattern',
    ownerId: '65c87eb27a77b2d4d9f022ff',
    description: 'A-line dress pattern for beginners.',
    patternImage: 'uploads/aline-dress.jpg',
    fabricType: 'woven',
    notions: ['buttons', 'zipper'],
    size: 'M',
    difficultyLevel: 'beginner',
    designer: 'Jane Doe',
    brand: 'Sewing Co.',
    format: 'pdf' // New field
  },
  {
    name: 'Pencil Skirt Pattern',
    ownerId: '67c33adbdccdf98684f9c101',
    description: 'Classic pencil skirt pattern for intermediate sewers.',
    patternImage: 'uploads/pencil-skirt.jpg',
    fabricType: 'stretched',
    notions: ['elastic', 'hook and eye'],
    size: 'L',
    difficultyLevel: 'intermediate',
    designer: 'John Smith',
    brand: 'Stitch It Right',
    format: 'paper' // New field
  },
  {
    name: 'Wrap Dress Pattern',
    ownerId: '67c33b61493fa7a42c3ed863',
    description: 'Elegant wrap dress pattern for advanced sewers.',
    patternImage: 'uploads/wrap-dress.jpg',
    fabricType: 'woven',
    notions: ['belt', 'buttons'],
    size: 'S',
    difficultyLevel: 'advanced',
    designer: 'Emily Johnson',
    brand: 'Fashion Forward',
    format: 'pdf' // New field
  }
];

module.exports = patterns