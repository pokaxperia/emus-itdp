<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Emus - Admin</title>
<?php 
foreach($css_files as $file): ?>
	<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
<?php endforeach; ?>
<?php foreach($js_files as $file): ?>
	<script src="<?php echo $file; ?>"></script>
<?php endforeach; ?>
<script src='https://api.mapbox.com/mapbox.js/v2.2.3/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v2.2.3/mapbox.css' rel='stylesheet' />
<style type='text/css'>
	body
	{
		font-family: Arial;
		font-size: 14px;
	}
	a {
		color: blue;
		text-decoration: none;
		font-size: 14px;
	}
	a:hover
	{
		text-decoration: underline;
	}
	strong { font-size:16px; }
	.link { cursor:pointer; color:blue; font-size:14px; }
	#catalogos { display:none; padding:0;}
	#map { position:relative; bottom:0; width:100%; height:400px; float:left; }
</style>
</head>
<body>
	<div>
		<a href="<?php echo site_url('admin/proyectos')?>">
			<?php if($this->uri->segment(2) == "proyectos") { ?><strong>Proyectos</strong><?php } else { ?>Proyectos<?php } ?>
		</a> |
		<?php if(isset($_SESSION['user_id'])) { ?>
			<a href="<?php echo site_url('admin/logout')?>">Cerrar sesión</a>
		<?php } ?>
	</div>
		
	<div style='height:20px;'></div>  
    <div>
		<?php echo $output; ?>
    </div>
	
	 <script type="text/javascript">
		$(document).ready( function () {
			$("#field-image_url > a").attr("href", $("#field-image_url > a").html());
		});
    </script>
</body>
</html>
