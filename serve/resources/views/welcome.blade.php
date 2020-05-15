<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Serve DTMOWED</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link  rel="icon"   href="img/favicon.icon" type="image/icon" />
        <!-- Styles -->
        <style>
           body{
            font: 15px/1.5 Arial, Helvetica, sans-serif;
            padding: 0;
            margin: 0;
            background-color: #ffffff;
            }
            /* Global */
            .container{
            width: 80%;
            margin: auto;
            overflow: hidden;
            }

            ul {
            margin: 0;
            padding: 0;
            }

            .button_1{
            height: 38px;
            background: #00aae4;
            border: 0;
            padding-left: 20px;
            padding-right: 20px;
            color: #ffffff;
            }

            .dark {
            padding: 15px;
            background: #35424a;
            color: #ffffff;
            margin-top: 10px;
            margin-bottom: 10px;
            }
            /* Header */
            header {
            background: #35424a;
            color: #ffffff;
            padding-top: 5px;
            min-height: 20px;
            border-bottom: #00aae4 3px solid;
            }

            header a {
            color: #ffffff;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 16px;
            }


            header li{
            float: left;
            display: inline;
            padding: 0 20px 0 20px;
            }

            header #branding {
            float: left;
            }

            header #branding h1 {
            margin: 0;
            }

            header nav {
            float: right;
            margin-top: 10px;
            }

            header .highlight, header .current a{
            color: #00aae4;
            font-weight: bold;
            }

            header a:hover{
            color: #cccccc;
            font-weight: bold;
            }

            /* Showcase */
            #showcase {
            min-height: 300px;
            background: url('http://www.mvminfotech.com/blog/wp-content/uploads/1920x1200-3.jpg.png') no-repeat ;
            text-align: center;
            color: #ffffff;
            }

            #showcase h1 {
            margin-top:100px;
            font-size: 55px;
            margin-bottom: 10px;
            }

            #showcase p {
            font-size: 20px;
            }

            /* newsletter */
            #newsletter {
            padding: 15px;
            color: #ffffff;
            background: #35424a;
            }

            #newsletter h1 {
            float: left;
            }

            #newsletter form {
            float: right;
            margin-top: 15px;
            }

            #newsletter input[type="email"]{
            padding: 4px;
            height: 25px;
            width: 250px;
            }

            /* boxes*/
            #boxes {
            margin-top: 20px;
            }

            #boxes .box {
            float: left;
            text-align: center;
            width: 30%;
            padding: 10px;
            }

            #boxes .box img{
            width:90px;
            }

            /* Sidebar */
            aside#sidebar {
            float: right;
            width: 30%;
            margin-top: 10px;
            }

            aside#sidebar .quote input, aside#sidebar .quote textarea{
            width: 90%;
            padding: 5px;
            }

            /*Main-col*/
            article#main-col {
            float: left;
            width: 65%;  
            }

            /* Services */
            ul#services li {
            list-style: none;
            padding: 20px;
            border: #cccccc solid 1px;
            margin-bottom: 5px;
            background: #e6e6e6;
            }

            /* footer */
            footer {
            padding: 5px;
            margin-top: 5px;
            color: #000000;
            background-color: #e6e6e6;
            text-align: center;
            }

            /* Media Queries */
            @media(max-width: 768px) {
            header #branding, 
            header nav,
            header nav li,
            #newlsetter h1,
            #newsletter form,
            #boxes .box,
            article#main-col,
            aside#sidebar{
                float: none;
                text-align: center;
                width: 100%
            }
            
            header {
            padding-bottom: 10px; 
            }
            
            #showcase h1 {
                margin-top: 40px;
            }
            
            #newletter button,  .quote button {
                dislplay: block;
                width: 100%;
            }
            
            #newsletter form input[type="email"], .quote input, .quote textarea{
            width: 100%;
            margin-bottom: 20px
            }
            }
        </style>
    </head>
    <body>
        <header>
            <div class="container">
            <div id="branding">
                <h1><span class="highlight">DTMOWED </span>CIA. LTDA.</h1>
            </div>
            <nav>
                <ul>
                <li class="current"><a href="https://dtmowed.org/" target="_blanck">Sobre Nosotros</a></li>
                </ul>
            </nav>
            </div>
        </header>

        <section id="showcase">
            <div class="container">
            <h1>BACKEND READY</h1>
            <p>Sistema envio de Data</p>
            </div>
        </section>

        <section id="boxes">
            <div class="container">
           
                <div style="text-align: center">
                    <img src="/img/logo.png" width="180px" />
                </div>
           
            </div>
        </section>

        <footer>
            <p>DTMOWED CIA. LTDA. Web Design, Copyright &#169; 2020</p>
        </footer>
        </body>
</html>
