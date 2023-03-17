## API_APPSTRO  docs


# Pre-requisitos
#### Antes de empezar debes cumplir con un requisitos para que puedas instalar el API :
     La vercion de node debe ser la 18.15 o superior y una vercion de npm equivalente 
     si es que aun no lo tienes puedes vistar el sitioweb oficial en https://nodejs.org/en

#### Posteriormente deberas instalar la base de datos en tu gestor, y deberas colocarle el siguiente cotejamiento:
  ![image](https://user-images.githubusercontent.com/85807291/225981079-0b5609af-ae6c-43d7-939d-dd6d65206672.png)
  
#### El archivo .sql se encuentra en este repositorio en la siguiente carpeta:
![tempsnip](https://user-images.githubusercontent.com/85807291/225982457-6a91b9b4-e94b-4862-8f83-1fbc5b3e5198.png)

# Teniendo esto ya podras instalar la API de manera local

#### Para clonar el repositorio de manera local, debes ejecutar el siguente comando

    git clone https://github.com/Sebastian9751/API_APPSTRO.git
    
    
#### Posteriormente instalar las dependencias con el siguiente comando en la carpeta raiz del proyecto
    
    npm install
    
    
#### Ya dentro del proyecto, debes renombrar el ".env example"  a ".env" y colocarle tus credenciales

![image](https://user-images.githubusercontent.com/85807291/225959151-e0091259-1508-4b4b-a0d5-2425acfb4a39.png)

#### Una vez todo este correcatamente configurado deberas iniciar el servidor 
    npm run dev
    
#### Deveras ver la siguiente inpresion en consola:

![image](https://user-images.githubusercontent.com/85807291/225961323-44c3e64f-1f38-4e5b-9bec-a00524ed31d3.png)



#### Una vez hecho esto, podras consultar la API desde cualquier cliente, por ejemplo PostMan


#### Obtener los tipos de atros disponibles:
-GET : localhost:3000/api/astros/types 
    
```json
[
    {
        "id_type_astro": 1,
        "type_astro": "Planetas",
        "img_type_astrourl": "https://www.xtrafondos.com/wallpapers/resized/planeta-tierra-con-destello-de-luz-4460.jpg?s=large"
    },
    {
        "id_type_astro": 2,
        "type_astro": "Estrellas",
        "img_type_astrourl": "https://astroaficion.com/wp-content/uploads/2012/04/Sirius-1-1200x799.jpg"
    },
    {
        "id_type_astro": 3,
        "type_astro": "Cometas",
        "img_type_astrourl": "https://services.meteored.com/img/article/por-que-o-cometa-que-vai-reaparecer-apos-50-mil-anos-e-verde-1673509703001_1024.jpeg"
    },
    {
        "id_type_astro": 4,
        "type_astro": "Satélites ",
        "img_type_astrourl": "https://w.wallhaven.cc/full/5w/wallhaven-5wzvz8.png"
    }
]
```


#### Obtener los astros por tipo
-GET : localhost:3000/api/astros/type/1
```json  
 [
    {
        "id_astro": 2,
        "name_astro": "Tierra",
        "type_astro": "Planetas",
        "description": "la tierra hijo",
        "name_com": "Metano",
        "composition_description": "es metano hijo, muy peligroso",
        "distance": 20231,
        "image_url": "data:image/jpeg"
    },
        
    {
        "id_astro": 6,
        "name_astro": "Marte",
        "type_astro": "Planetas",
        "description": "Nuestro hermano en el sistema solar",
        "name_com": "Metano",
        "composition_description": "es metano hijo, muy peligroso",
        "distance": 400,
        "image_url": "https://cdn0.geoenciclopedia.com/es/posts/1/5/0/marte_51_orig.jpg"
    },
    {
        "id_astro": 7,
        "name_astro": "Jupiter",
        "type_astro": "Planetas",
        "description": "Este es Jupiter",
        "name_com": "Metano",
        "composition_description": "es metano hijo, muy peligroso",
        "distance": 401520,
        "image_url": "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRS5G-fpV8aDvEWIAPzCqEL1jEWMJl5d2YxkLcVUhNlbFJSasq1s4dNjaJpj4Tgldcl"
    }
]
```   

### Obtener un solo astro 
-GET : 'localhost:3000/api/astros/one/1'

```json
[
    {
        "id_astro": 1,
        "type_astro": "Estrellas",
        "name_astro": "sun ",
        "description": "Las estrellas son cuerpos celestes que representan enormes motores de energía cósmica y que producen calor, luz y radiaciones (como rayos ultravioletas y rayos X).\r\n\r\n",
        "image_url": "https://concepto.de/wp-content/uploads/2020/03/cuerpos-celestes-estrellas-e1585096688475.jpg",
        "distance": 25,
        "name_com": "Metano",
        "composition_description": "es metano hijo, muy peligroso"
    }
]

```  
    



    
    
