#!/bin/bash

# # Nombre del proyecto
# PROJECT_NAME="my-redux-jwt-app"
#
# # Crear carpeta raíz del proyecto
# mkdir $PROJECT_NAME
# cd $PROJECT_NAME

# Crear carpeta public
mkdir public

# Crear carpeta src y subcarpetas
mkdir -p src/{app,components,features,services,pages,routes,utils}

# Crear archivos base
touch public/index.html
touch src/{App.js,index.css,main.js}

# Crear archivos en la carpeta app
touch src/app/store.js

# Crear archivos en la carpeta components
touch src/components/{LoginForm.js,UserStatus.js}

# Crear archivos en la carpeta features
touch src/features/authSlice.js

# Crear archivos en la carpeta services
touch src/services/authService.js

# Crear archivos en la carpeta pages
touch src/pages/{HomePage.js,LoginPage.js}

# Crear archivos en la carpeta routes
touch src/routes/AppRoutes.js

# Crear archivos en la carpeta utils
touch src/utils/jwtUtils.js

echo "Estructura de carpetas y archivos base creada exitosamente."
