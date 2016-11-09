<?php
    include('connection.php');

    $query = $mysqli->query("SELECT s.id_solicitud, t.nombre_tienda, s.hora_solicitud, CONCAT(e.name, ' ',e.last_name) AS empleado, CONCAT(c.primer_nombre, ' ', c.primer_apellido) AS cliente, cot.v_prima, cot.financiamiento, CONCAT(p.nombre_producto,' ', m.nombre_modelo) as producto, s.fecha_solicitud, es.nombre_estsol FROM solicitud s, tienda t, employee e, cliente c, cotizacion_credito cot, productos p, modelo m, estado_solic es WHERE s.id_tienda = t.id_tienda AND s.id_employee = e.id_employee AND s.id_cliente = c.id_cliente AND s.id_cotizacion = cot.id_cotizacion AND cot.id_producto = p.id_producto AND p.id_modelo = m.id_modelo AND s.id_estsol = es.id_estsol ORDER BY s.fecha_solicitud DESC, s.hora_solicitud DESC");

    $queryProd = $mysqli->query("SELECT COUNT(c.id_cotizacion), CONCAT(p.nombre_producto, ' ', m.nombre_modelo) as producto FROM cotizacion_credito c, productos p, modelo m WHERE p.id_modelo = m.id_modelo AND c.id_producto = p.id_producto GROUP BY 2 ORDER BY 1 DESC LIMIT 1");

    $querytienda = $mysqli->query("SELECT COUNT(s.id_solicitud), t.nombre_tienda FROM solicitud s,tienda t WHERE s.id_tienda = t.id_tienda GROUP BY 2 ORDER BY 1 DESC LIMIT 1 ");

    $queryPrim = $mysqli->query("select sum(v_prima) as total from cotizacion_credito");

    $queryfin = $mysqli->query("SELECT max(financiamiento) as max from cotizacion_credito");
    
    $productomayor = $queryProd->fetch_assoc();
    $productoM = $productomayor["producto"];

    $primat = $queryPrim->fetch_assoc();
    $primaTotal = $primat["total"];

    $finan = $queryfin->fetch_assoc();
    $financiamiento = $finan["max"];

    $tiend = $querytienda->fetch_assoc();
    $tienda = $tiend["nombre_tienda"];

    while($result = $query->fetch_assoc()){
        $solicitudes[] = array(
            "id" => $result["id_solicitud"],
            "tienda" => $result["nombre_tienda"],
            "hora" => $result["hora_solicitud"],
            "empleado" => $result["empleado"],
            "cliente" => $result["cliente"],
            "producto" => $result["producto"],
            "fecha" => $result["fecha_solicitud"],
            "estado" => $result["nombre_estsol"],
            "prima" => $result["v_prima"],
            "financiamiento" => $result["financiamiento"]
        );
    }

    echo json_encode(array(
        "solicitudes" => $solicitudes,
        "productoM" => $productoM,
        "primaTotal" => $primaTotal,
        "financiamiento" => $financiamiento,
        "tienda" => $tienda
    ));
?>