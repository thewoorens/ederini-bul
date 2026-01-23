type BaseTemplateProps = {
  title: string;
  content: string;
};

export const baseTemplate = ({ title, content }: BaseTemplateProps) => `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
    }
    .container {
      background: #ffffff;
      max-width: 600px;
      margin: auto;
      padding: 24px;
      border-radius: 8px;
    }
    .footer {
      margin-top: 32px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: limegreen;
      color: #fff !important;
      text-decoration: none;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>${title}</h2>
    ${content}

    <div class="footer">
      © ${new Date().getFullYear()} Ederini Bul
    </div>
  </div>
</body>
</html>
`;
