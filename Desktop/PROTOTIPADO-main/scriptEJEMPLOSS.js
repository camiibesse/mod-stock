// JavaScript Document

$(document).ready(function(){

    //LOGIN ------------------------------------------------------------------
    $("button.btn_login").off('click');
    $("button.btn_login").click(function(){
        $user = $("input#username").val();
        $pass = $("input#password").val();
        validarUserPass($user,$pass);
    });

    $("input#password").keypress(function(event){ if(event.which == 13) $("button.btn_login").click(); });
    //------------------------------------------------------------------------

    //BOTONES MENU -----------------------------------------------------------

    $("a#bHomeDashboard").off('click');
    $("a#bHomeDashboard").click(function(){
        //console.log('bHomeDashboard');
        $("div.contenedorHome").css('display','none');
        $("div.homeDashboard").css('display','block');
    });

    $("a#bIngresoPedidos").off('click');
    $("a#bIngresoPedidos").click(function(){
        //console.log('bIngresoPedidos');
        limpiarODCPROD(function(){
            getMD5({acc:'getMD5', modo:1},function(){
								limpiarForm('productosNuevaOrden',function(){
									//console.log('getMD5');
	                $("input#ndp_listadoCliente").off('keyup');
	                $("input#ndp_listadoCliente").keyup(function(){
	                    valor = $("input#ndp_listadoCliente").val();
	                    //ndp_listadoCliente
	                    if(valor.length>0){
	                        //console.log(valor);
	                        $.ajax({
	                            type:"POST",
	                            url:'prog/procesar.php',
	                            data : { acc:'buscarclienteTest', valor:valor },
	                            success: function(data){
	                                //console.log(data);
	                                $("div#ndp_listadoClienteDiv").css('display','block');
	                                $("div#ndp_listadoClienteDiv").html(data);

	                                $("div#ndp_listadoClienteDiv a").off('click');
	                                $("div#ndp_listadoClienteDiv a").click(function(){

	                                    nombre = $(this).html();
	                                    valor = $(this).attr('id');
	                                    //console.log(nombre+" "+valor);
	                                    $("input#ndp_listadoCliente").val(nombre);
	                                    $("input#ndp_listadoCliente").attr('idCliente',valor);
	                                    $("div#ndp_listadoClienteDiv").html("");
	                                    $("div#ndp_listadoClienteDiv").css('display','none');
	                                });
	                            },
	                            error: function(){ console.log('error | buscarclienteTest'); },
	                        });
	                    }
	                    else{
	                        $("div#ndp_listadoClienteDiv").css('display','none');
	                        $("div#ndp_listadoClienteDiv").html("");
	                    }
	                });

	                $("input#ndp_prod_select").off('keyup');
	                $("input#ndp_prod_select").keyup(function(){
	                    valor = $("input#ndp_prod_select").val();
	                    if(valor.length>0){
	                        //console.log(valor);
	                        $.ajax({
	                            type:"POST",
	                            url:'prog/procesar.php',
	                            data : { acc:'buscarproductoTest', valor:valor },
	                            success: function(data){
	                                //console.log(data);
	                                $("div#ndp_prod_selectDiv").css('display','block');
	                                $("div#ndp_prod_selectDiv").html(data);

	                                $("div#ndp_prod_selectDiv a").off('click');
	                                $("div#ndp_prod_selectDiv a").click(function(){

	                                    nombre = $(this).html();
	                                    valor = $(this).attr('id');
	                                    //console.log(nombre+" "+valor);
	                                    $("input#ndp_prod_select").val(nombre);
	                                    $("input#ndp_prod_select").attr('idProducto',valor);
	                                    $("div#ndp_prod_selectDiv").html("");
	                                    $("div#ndp_prod_selectDiv").css('display','none')
	                                });
	                            },
	                            error: function(){ console.log('error | buscarproductoTest'); },
	                        });
	                    }
	                    else{
	                        $("div#ndp_prod_selectDiv").css('display','none');
	                        $("div#ndp_prod_selectDiv").html("");
	                    }
	                });

									$("button.ndp_nuevaordendecompra").css('display','inline-block');
									$("button.ndp_modordendecompra").css('display','none');
									$("span.tituloNODC").css('display','block');
									$("span.tituloEODC").css('display','none');

	                odcValidador = $("input#ndp_validador").val();
	                listarProductosODC({acc:'listarProductosODC',modo:1,validador:odcValidador},function(){

	                    //BOTONES E INPUT NORMAL ---
	                    $("div.contenedorHome").css('display','none');
	                    $("div.ingresarPedidos").css('display','block');

	                    $("input#ndp_prod_fecharde").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });

	                    $("input#ndp_prod_precioxk").off('keyup');
	                    $("input#ndp_prod_precioxk").keyup(function(){
	                        kilos = $("input#ndp_prod_kilogramos").val();
	                        kilos = kilos.replace(',','.');
	                        $("input#ndp_prod_kilogramos").val(kilos);

	                        precio = $("input#ndp_prod_precioxk").val();
	                        precio = precio.replace(',','.');
	                        $("input#ndp_prod_precioxk").val(precio);

	                        Number(kilos);
	                        Number(precio);
	                        total = kilos*precio;
	                        $("input#ndp_prod_precioTotal").val(total);
	                    });

	                });
								});
            });
        });
    });

    $("a#bListarODC").off('click');
    $("a#bListarODC").click(function(){
		//console.log('bListarODC');
		$("div.contenedorHome").css('display','none');
		datos = { acc:'listarOrdenesDeCompra', modo:1 };

		listarOrdenesDeCompra(datos,function(){
			//console.log('listarOrdenesDeCompra');

			$("span.ntpedidoBotones").off('click');
			$("span.ntpedidoBotones").click(function(){
				idboton = $(this).attr('id');
				setTipoOrdenDeCompra({ acc:'setTipoOrdenDeCompra', id:idboton },function(){ $("a#bListarODC").click(); });
			});

            $("table#odc_tablaLista").bootstrapTable({
				onPostBody: function(){
					//console.log('odc_tablaLista');
					$("div.listarODC").css('display','block');

                    $("tbody#odc_tablaListaBODY tr").off('click');
                    $("tbody#odc_tablaListaBODY tr").click(function(){

						id = $(this).find("td.id").html();
                        validador = $(this).attr('class');
                        listarOrdenesDeCompra({ acc:'listarOrdenesDeCompra', modo:2, id:id },function(){
                            listarProductosODC({ acc:'listarProductosODC', modo:2, validador:validador },function(){

								$("button.btnGrabarBandeja").off('click');
                                $("button.btnGrabarBandeja").click(function(){
                                    idbtn = $(this).attr('idproducto');
                                    estado = $("select#estadosODP"+idbtn+" option:selected").val();
                                    nombre = $("select#estadosODP"+idbtn+" option:selected").html();
									cantidad_ori = $(this).parent().parent().find("td.odcprod_kilogramos").text();
                                    //console.log( { idbtn:idbtn, estado:estado, nombre:nombre } )

									cambioDeEstadoODP({ idbtn:idbtn, estado:estado, cantidad_ori:cantidad_ori },function(){});
                                });

                                $("tbody#odc_productos2BODY tr").off('dblclick');
                                $("tbody#odc_productos2BODY tr").dblclick(function(){
                                    //console.log('dblclick');
                                    id = $(this).attr('id');
                                    //console.log(id);

														        moraStatus = $(this).hasClass('overdueTR');

																		if(moraStatus === true){
																			$(this).removeClass('overdueTR');
																			moraStatusTR = 'active';
																		}
																		else{
																			$(this).addClass('overdueTR');
																			moraStatusTR = 'inactive';
																		}

														        datosMora = { acc:'setUnsetMora', id:id, modo:'prod', accion:moraStatusTR };
																		//console.log(datosMora);

																		setUnsetMora(datosMora,function(){
																		});


                                });

                                $("td.odcprod_observaciones").off('click');
                                $("td.odcprod_observaciones").click(function(){

                                    codigo = $(this).parent().find("td.odcprod_codigo").html();
                                    nombre = $(this).parent().find("td.odcprod_nombre").html();
                                    idprod = $(this).parent().attr('id');

                                    //console.log(idprod);
                                    observacionesODC({ acc:'observacionesODC', idprod:idprod }, function(salida){
                                        //console.log(salida);

                                        $("h4#mymodalTitulo").html('Observaciones del producto: '+nombre+'('+codigo+')');
                                        $("div#mymodalCuerpo").html(`
                                            <div>Observación inicial:</div>
                                            <textarea class="form-control" readonly>`+salida.observacion+`</textarea>

                                            <div style='height:10px;'>&nbsp;</div>

                                            <div>Bandeja Producción:</div>
                                            <textarea class="form-control" readonly>`+(salida.bprod_observacion!=null?salida.bprod_observacion:`Sin Observación`)+`</textarea>

                                            <div style='height:10px;'>&nbsp;</div>

                                            <div>Bandeja Ionics:</div>
                                            <textarea class="form-control" readonly>`+(salida.bionics_observacion!=null?salida.bionics_observacion:`Sin Observación`)+`</textarea>

                                            <div style='height:10px;'>&nbsp;</div>

                                            <div>Bandeja Despacho:</div>
                                            <textarea class="form-control" readonly>`+(salida.bdespacho_observacion!=null?salida.bdespacho_observacion:`Sin Observación`)+`</textarea>
                                        `);
                                        $("div#mymodalPie").html('<button class="btn btn-primary">Cerrar</button>');

                                        $("div#mymodalPie").find('button').off('click');
                                        $("div#mymodalPie").find('button').click(function(){
                                            $("div#mymodal").modal('toggle');
                                            $("h4#mymodalTitulo").html('');
                                            $("div#mymodalCuerpo").html('');
                                            $("div#mymodalPie").html('');
                                        });


                                    });

                                    $("div#mymodal").modal('toggle');
                                });
							});

                            $("div.contenedorHome").css('display','none');
                            $("div.crearODP").css('display','block');

                            $("span.btnPrint").off('click');
                            $("span.btnPrint").click(function(){
                                idODC = $("span#idODC").html();
                                generaImpresion({modo:'enviaDatos',validador:validador,idODC:idODC});
                            });

                            $("span.btnClose").off('click');
                            $("span.btnClose").click(function(){
                                idODC = $("span#idODC").html();
                                cerrarOrdenDeActividad({acc:'cerrarOrdenDeActividad', idODC:idODC },function(){
                                    $("a#bListarODC").click();
                                });
                            });

							$("span.btnOCEdit").off('click');
							$("span.btnOCEdit").click(function(){ //EDITAR ORDEN DE COMPRA ----
								//console.log('edit');
								$("div.contenedorHome").css('display','none');
								$("input#ndp_validador").val(validador);

								limpiarODCPROD(function(){
									$("input#ndp_listadoCliente").off('keyup');
	                $("input#ndp_listadoCliente").keyup(function(){
	                    valor = $("input#ndp_listadoCliente").val();
	                    //ndp_listadoCliente
	                    if(valor.length>0){
	                        //console.log(valor);
	                        $.ajax({
	                            type:"POST",
	                            url:'prog/procesar.php',
	                            data : { acc:'buscarclienteTest', valor:valor },
	                            success: function(data){
	                                //console.log(data);
	                                $("div#ndp_listadoClienteDiv").css('display','block');
	                                $("div#ndp_listadoClienteDiv").html(data);

	                                $("div#ndp_listadoClienteDiv a").off('click');
	                                $("div#ndp_listadoClienteDiv a").click(function(){

	                                    nombre = $(this).html();
	                                    valor = $(this).attr('id');
	                                    //console.log(nombre+" "+valor);
	                                    $("input#ndp_listadoCliente").val(nombre);
	                                    $("input#ndp_listadoCliente").attr('idCliente',valor);
	                                    $("div#ndp_listadoClienteDiv").html("");
	                                    $("div#ndp_listadoClienteDiv").css('display','none');
	                                });
	                            },
	                            error: function(){ console.log('error | buscarclienteTest'); },
	                        });
	                    }
	                    else{
	                        $("div#ndp_listadoClienteDiv").css('display','none');
	                        $("div#ndp_listadoClienteDiv").html("");
	                    }
	                });

	                $("input#ndp_prod_select").off('keyup');
	                $("input#ndp_prod_select").keyup(function(){
	                    valor = $("input#ndp_prod_select").val();
	                    if(valor.length>0){
	                        //console.log(valor);
	                        $.ajax({
	                            type:"POST",
	                            url:'prog/procesar.php',
	                            data : { acc:'buscarproductoTest', valor:valor },
	                            success: function(data){
	                                //console.log(data);
	                                $("div#ndp_prod_selectDiv").css('display','block');
	                                $("div#ndp_prod_selectDiv").html(data);

	                                $("div#ndp_prod_selectDiv a").off('click');
	                                $("div#ndp_prod_selectDiv a").click(function(){

	                                    nombre = $(this).html();
	                                    valor = $(this).attr('id');
	                                    //console.log(nombre+" "+valor);
	                                    $("input#ndp_prod_select").val(nombre);
	                                    $("input#ndp_prod_select").attr('idProducto',valor);
	                                    $("div#ndp_prod_selectDiv").html("");
	                                    $("div#ndp_prod_selectDiv").css('display','none')
	                                });
	                            },
	                            error: function(){ console.log('error | buscarproductoTest'); },
	                        });
	                    }
	                    else{
	                        $("div#ndp_prod_selectDiv").css('display','none');
	                        $("div#ndp_prod_selectDiv").html("");
	                    }
	                });

									$("button.ndp_nuevaordendecompra").css('display','none');
									$("button.ndp_modordendecompra").css('display','block');
									$("span.tituloNODC").css('display','none');
									$("span.tituloEODC").css('display','inline-block');

	                odcValidador = validador;
									listarOrdenesDeCompra({ acc:'listarOrdenesDeCompra', modo:3, id:id },function(response){
										console.log(response);

										$("input#ndp_listadoCliente").val(response.razon_social);
										$("input#ndp_listadoCliente").attr('idcliente',response.id_cliente);

										$("input#ndp_lugardeentrega").val(response.lugar_entrega);

										$("textarea#ndp_observacion").val(response.observacion);
										$("input#ndp_cdp").val(response.condicion_pago);
										$("input#ndp_nodcc").val(response.numero_odcc);

										$("button.ndp_modordendecompra").attr('idlista',id);

										listarProductosODC({acc:'listarProductosODC',modo:3,validador:odcValidador},function(){
											//BOTONES E INPUT NORMAL ---
										  $("div.contenedorHome").css('display','none');
	                    $("div.ingresarPedidos").css('display','block');

	                    $("input#ndp_prod_fecharde").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });

	                    $("input#ndp_prod_precioxk, input#ndp_prod_kilogramos").off('keyup');
	                    $("input#ndp_prod_precioxk, input#ndp_prod_kilogramos").keyup(function(){
	                        kilos = $("input#ndp_prod_kilogramos").val();
	                        kilos = kilos.replace(',','.');
	                        $("input#ndp_prod_kilogramos").val(kilos);

	                        precio = $("input#ndp_prod_precioxk").val();
	                        precio = precio.replace(',','.');
	                        $("input#ndp_prod_precioxk").val(precio);

	                        Number(kilos);
	                        Number(precio);
	                        total = kilos*precio;
	                        $("input#ndp_prod_precioTotal").val(total);
	                    });

										});


									});



								});

							});

                            $("span.btnOCMora").attr('idodc',id);

                        });


                    });
                }
            });
        });
    });

    $("a#bListarUsuarios").off('click');
    $("a#bListarUsuarios").click(function(){
		//console.log('bListarUsuarios');
        $("div.contenedorHome").css('display','none');
        $("div.contenedorUsuarios").css('display','none');

        $("div.usuarios").css('display','block');
        $("div.listaUsuarios").css('display','block');

		selUsuarios({ acc:'selUsuarios', modo:2 },function(){

			$("table#tablaListarUsuarios").bootstrapTable({
				onPostBody: function(){
					$("tbody.tablaListarUsuariosBody tr").off('click');
					$("tbody.tablaListarUsuariosBody tr").click(function(){
						username = $(this).find('td.username').html();
						iduser = $(this).attr('id');
						//console.log(username);

						//BOTONES
						$("button.users_btn_add").css('display','none');
						$("button.users_btn_addCancel").css('display','none');
						$("button.users_btn_del").css('display','inline-block');
						$("button.users_btn_mod").css('display','inline-block');

						selUsuarios({ acc:'selUsuarios', modo:3, username:username },function(resultado){
							console.log(resultado);
							$("input.users_username").val(resultado.username);
							$("input.users_password").val(resultado.password);
							$("input.users_nombre").val(resultado.nombre);
							$("input.users_apellido").val(resultado.apellido);

							$("input.users_permisos_carga").val(resultado.carga);
							$("input.users_permisos_consultas").val(resultado.consultas);
							$("input.users_permisos_altas").val(resultado.altas);
							$("input.users_permisos_bajas").val(resultado.bajas);
							$("input.users_permisos_modificaciones").val(resultado.modificaciones);
							$("input.users_permisos_reportes").val(resultado.reportes);

							$("input.users_permisos_ceoda").val(resultado.ce_oda);
							$("input.users_permisos_ceprod").val(resultado.ce_prod);
							$("input.users_permisos_ceionics").val(resultado.ce_ionics);
							$("input.users_permisos_cedesp").val(resultado.ce_desp);
							$("input.users_permisos_cesinstock").val(resultado.ce_sinstock);

							$("input.users_permisos_cioda").val(resultado.ci_oda);
							$("input.users_permisos_ciprod").val(resultado.ci_prod);
							$("input.users_permisos_ciionics").val(resultado.ci_ionics);
							$("input.users_permisos_cidesp").val(resultado.ci_desp);

							$("input.users_permisos_cierreorden").val(resultado.cierre_orden);
							$("input.users_permisos_moraorden").val(resultado.mora_orden);
							$("input.users_permisos_editorden").val(resultado.edit_orden);
							$("input.users_permisos_admin").val(resultado.admin);
							$("input.users_permisos_administracion").val(resultado.administracion);
							$("input.users_permisos_adminvent").val(resultado.admin_vent);
							$("input.users_permisos_vendedor").val(resultado.vendedor);

							$("button.users_btn_mod").off('click');
							$("button.users_btn_mod").click(function(){
								//console.log('users_btn_mod');
								username = $("input.users_username").val();
								password = $("input.users_password").val();
								nombre = $("input.users_nombre").val();
								apellido = $("input.users_apellido").val();

								carga = $("input.users_permisos_carga").val();
								consultas = $("input.users_permisos_consultas").val();
								altas = $("input.users_permisos_altas").val();
								bajas = $("input.users_permisos_bajas").val();
								modificaciones = $("input.users_permisos_modificaciones").val();
								reportes = $("input.users_permisos_reportes").val();

								ce_oda = $("input.users_permisos_ceoda").val();
								ce_prod = $("input.users_permisos_ceprod").val();
								ce_ionics = $("input.users_permisos_ceionics").val();
								ce_desp = $("input.users_permisos_cedesp").val();
								ce_sinstock = $("input.users_permisos_cesinstock").val();

								ci_oda = $("input.users_permisos_cioda").val();
								ci_prod = $("input.users_permisos_ciprod").val();
								ci_ionics = $("input.users_permisos_ciionics").val();
								ci_desp = $("input.users_permisos_cidesp").val();

								cierre_orden = $("input.users_permisos_cierreorden").val();
								mora_orden = $("input.users_permisos_moraorden").val();
								editOrden = $("input.users_permisos_editorden").val();
								admin = $("input.users_permisos_admin").val();
								administracion = $("input.users_permisos_administracion").val();
								adminvent = $("input.users_permisos_adminvent").val();
								vendedor = $("input.users_permisos_vendedor").val();

								datos = { acc:'modificarUsuario', iduser:iduser, username:username, password:password, nombre:nombre, apellido:apellido, carga:carga, consultas:consultas, altas:altas, bajas:bajas, modificaciones:modificaciones, reportes:reportes, ce_oda:ce_oda, ce_prod:ce_prod, ce_ionics:ce_ionics, ce_desp:ce_desp, ce_sinstock:ce_sinstock, ci_oda:ci_oda, ci_prod:ci_prod, ci_ionics:ci_ionics, ci_desp:ci_desp, cierre_orden:cierre_orden, mora_orden:mora_orden, admin:admin, administracion:administracion, adminvent:adminvent, vendedor:vendedor, edit_orden:editOrden }
								//console.log(datos);
								modificarUsuario(datos,function(){ $("a#bListarUsuarios").click(); });
							});

							$("button.users_btn_del").off('click');
							$("button.users_btn_del").click(function(){

								$("h4#mymodalTitulo").html('Eliminación de usuario: '+resultado.username);
								$("div#mymodalCuerpo").html(`
									<div>Completar campo con el nombre de usuario:</div>
									<input type="text" class="form-control delUsuarioConfirm" />
									<div style="height:10px;">&nbsp;</div>
									<button class="btn btn-danger delUsuarioConfirm_btn_ok">Eliminar</button>
								`);
								$("div#mymodalPie").html('<button class="btn btn-primary delUsuarioConfirm_btn_cancel">Cancelar</button>');

								$("div#mymodalPie").find('button.delUsuarioConfirm_btn_cancel').off('click');
								$("div#mymodalPie").find('button.delUsuarioConfirm_btn_cancel').click(function(){
									$("div#mymodal").modal('toggle');
									$("h4#mymodalTitulo").html('');
									$("div#mymodalCuerpo").html('');
									$("div#mymodalPie").html('');
								});

								$("div#mymodalCuerpo").find('button.delUsuarioConfirm_btn_ok').off('click');
								$("div#mymodalCuerpo").find('button.delUsuarioConfirm_btn_ok').click(function(){
									confirm = $("div#mymodalCuerpo").find('input.delUsuarioConfirm').val();
									username = resultado.username;
									//console.log(confirm+' '+username);
									if(confirm == username){
										delUsuario({ acc:'delUsuario', iduser:resultado.id_user },function(){
											$("div#mymodal").modal('toggle');
											$("h4#mymodalTitulo").html('');
											$("div#mymodalCuerpo").html('');
											$("div#mymodalPie").html('');
											$("a#bListarUsuarios").click();
										});
									}
									else{ toastr.warning('Fallo, el nombre de usuario ingresado en el cuadro de texto no es el mismo que el usuario que quiere eliminar.'); }
								});

								$("div#mymodal").modal('toggle');
							});

						});


						$("div.listaUsuarios").css('display','none');
			            $("div.datosUsuarios").css('display','block');
					});
				}
			});

			$("button.btnAddUser").off('click');
			$("button.btnAddUser").click(function(){
				//console.log('btnAddUser');
				limpiarForm('usuariosAlta',function(){
					$("div.listaUsuarios").css('display','none');
					$("div.datosUsuarios").css('display','block');

					//BOTONES
					$("button.users_btn_mod").css('display','none');
					$("button.users_btn_del").css('display','none');
					$("button.users_btn_add").css('display','inline-block');
					$("button.users_btn_addCancel").css('display','inline-block');

					$("button.users_btn_addCancel").off('click');
					$("button.users_btn_addCancel").click(function(){
						limpiarForm('usuariosAlta',function(){
							$("div.datosUsuarios").css('display','none');
							$("div.listaUsuarios").css('display','block');
							//BOTONES
							$("button.users_btn_add").css('display','none');
							$("button.users_btn_addCancel").css('display','none');
							$("button.users_btn_del").css('display','inline-block');
							$("button.users_btn_mod").css('display','inline-block');
						});
					});

					$("button.users_btn_add").off('click');
					$("button.users_btn_add").click(function(){
						username = $("input.users_username").val();
						password = $("input.users_password").val();
						nombre = $("input.users_nombre").val();
						apellido = $("input.users_apellido").val();

						carga = $("input.users_permisos_carga").val();
						consultas = $("input.users_permisos_consultas").val();
						altas = $("input.users_permisos_altas").val();
						bajas = $("input.users_permisos_bajas").val();
						modificaciones = $("input.users_permisos_modificaciones").val();
						reportes = $("input.users_permisos_reportes").val();

						ce_oda = $("input.users_permisos_ceoda").val();
						ce_prod = $("input.users_permisos_ceprod").val();
						ce_ionics = $("input.users_permisos_ceionics").val();
						ce_desp = $("input.users_permisos_cedesp").val();
						ce_sinstock = $("input.users_permisos_cesinstock").val();

						ci_oda = $("input.users_permisos_cioda").val();
						ci_prod = $("input.users_permisos_ciprod").val();
						ci_ionics = $("input.users_permisos_ciionics").val();
						ci_desp = $("input.users_permisos_cidesp").val();

						cierre_orden = $("input.users_permisos_cierreorden").val();
						mora_orden = $("input.users_permisos_moraorden").val();
						editOrden = $("input.users_permisos_editorden").val();
						admin = $("input.users_permisos_admin").val();
						administracion = $("input.users_permisos_administracion").val();
						adminvent = $("input.users_permisos_adminvent").val();
						vendedor = $("input.users_permisos_vendedor").val();

						datos = { acc:'cargarUsuario', username:username, password:password, nombre:nombre, apellido:apellido, carga:carga, consultas:consultas, altas:altas, bajas:bajas, modificaciones:modificaciones, reportes:reportes, ce_oda:ce_oda, ce_prod:ce_prod, ce_ionics:ce_ionics, ce_desp:ce_desp, ce_sinstock:ce_sinstock, ci_oda:ci_oda, ci_prod:ci_prod, ci_ionics:ci_ionics, ci_desp:ci_desp, cierre_orden:cierre_orden, mora_orden:mora_orden, admin:admin, administracion:administracion, adminvent:adminvent, vendedor:vendedor, edit_orden:editOrden }
						//console.log(datos);
						cargarUsuario(datos,function(){
							$("a#bListarUsuarios").click();
						});
					});

				});


			});

        });

    });

    $("a#bBandejaProduccion").off('click');
    $("a#bBandejaProduccion").click(function(){
        //console.log('bBandejaProduccion');
        $("div.contenedorHome").css('display','none');
        $("div.bandejaProduccion").css('display','block');
        bandejas({acc:'bandejas', idbandeja:2},function(){

            $("table#tabla_bProduccion").bootstrapTable({
                onPostBody: function(){
                    $("td.bProd_fte input").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });

                    $("button.bProd_guardarProd").off('click');
                    $("button.bProd_guardarProd").click(function(){
                        //console.log('button.bProd_guardarProd');
                        prodID = $(this).parent().parent().attr('id');
                        numero_odp = $("input#bProd_nodp"+prodID).val();
                        fecha_tde = $("input#bProd_fte"+prodID).val();
                        estado = $("select#bProd_selEstado"+prodID+" option:selected").val();
                        obser = $("input#bProd_obser"+prodID).val();

                        datos = { acc:'guardarCambiosBandejaProd', prodID:prodID, numero_odp:numero_odp, fecha_tde:fecha_tde, estado:estado, obser:obser };
                        //console.log(datos);
                        guardarCambiosBandejaProd(datos,function(){});
                    });
                }
            });
        });
    });

    $("a#bBandejaIonics").off('click');
    $("a#bBandejaIonics").click(function(){
        //console.log('bBandejaIonics');
        $("div.contenedorHome").css('display','none');
        $("div.bandejaIonics").css('display','block');
        bandejas({acc:'bandejas', idbandeja:4},function(){

            $("table#tabla_bIonics").bootstrapTable({
                onPostBody: function(){
                    $("td.bIonics_fsalida input").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });
                    $("td.bIonics_fretiro input").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });
                    $("td.bIonics_fte input").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });

                    $("button.bIonics_guardarProd").off('click');
                    $("button.bIonics_guardarProd").click(function(){
                        //console.log('button.bIonics_guardarProd');

                        prodID = $(this).parent().parent().attr('id');
                        obser = $("input#bIonics_obser"+prodID).val();
                        fecha_salida = $("input#bIonics_fsalida"+prodID).val();
                        fecha_retiro = $("input#bIonics_fretiro"+prodID).val();
                        estado = $("select#bIonics_selEstado"+prodID+" option:selected").val();


                        datos = { acc:'guardarCambiosBandejaIonics', prodID:prodID, fecha_salida:fecha_salida, fecha_retiro:fecha_retiro, estado:estado, obser:obser };
                        //console.log(datos);
                        guardarCambiosBandejaIonics(datos,function(){});

                    });
                }
            });
        });
    });

    $("a#bBandejaDespacho").off('click');
    $("a#bBandejaDespacho").click(function(){
        //console.log('bBandejaDespacho');
        $("div.contenedorHome").css('display','none');
        $("div.bandejaDespacho").css('display','block');
        bandejas({acc:'bandejas', idbandeja:3},function(){
            $("table#tabla_bDespacho").bootstrapTable({
                onPostBody: function(){
                    activaBoton({ boton:'tabla_bDespacho' });
                }
            });
        });
    });

	$("a#bBandejaDespachoV2").off('click');
	$("a#bBandejaDespachoV2").click(function(){
		//console.log('bBandejaDespacho');
        $("div.contenedorHome").css('display','none');
        $("div.bandejaDespachoV2").css('display','block');
        bandejas({acc:'despachoV2', idbandeja:3},function(){

        });
	});

    $("a#bBandejaSinStock").off('click');
    $("a#bBandejaSinStock").click(function(){
        //console.log('BandejaSinStock');

        $("div.contenedorHome").css('display','none');
        $("div.bandejaSinStock").css('display','block');

         bandejas({acc:'bandejas', idbandeja:5},function(){
             $("table#tabla_bSinStock").bootstrapTable({
                 onPostBody: function(){
                     $("button.btnEnStock").off('click');
                     $("button.btnEnStock").click(function(){
                         //console.log('btnEnStock');
                         idprod = $(this).attr('idprod');
                         cambioDeEstadoODP(idprod,1,function(){
                             $("a#bBandejaSinStock").click();
                         });
                     });
                 }
             });
         });

    });

	$("a#bBandejaFacturacion").off('click');
	$("a#bBandejaFacturacion").click(function(){

		$("div.contenedorHome").css('display','none');
        $("div.bandejaFacturacion").css('display','block');

		bandejas({acc:'bandejas', idbandeja:6},function(){
			$("table#tabla_bFacturacion").bootstrapTable({
				onPostBody: function(){
					$("input.bFacturacion_fechafactura").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });
					/* ESTO ES PARA DESPACHO EN PARTES.
					$("select.bFacturacion_selectEstado").off('change');
					$("select.bFacturacion_selectEstado").change(function(){
						idactual = $(this).val();
						if(idactual == 'DESPACHO'){

							//DESPACHO V2

							$("h4#mymodalTitulo").html('Enviar a despacho');

							cuerpo = `
								<div>
									<h4>Elegir opcion total o parcial</h4>
									<button class="btn btn-primary btn_despacho_total" style="width:100%;">Total</button>
									<div class="input-group" style="margin-top:20px;">
										<input type="text" class="form-control cantidad_despacho_parcial" placeholder="Cantidad a despachar" aria-describedby="basic-addon2">
										<span class="input-group-addon btn btn-primary btn_despacho_parcial" id="basic-addon2">Parcial</span>
									</div>
								</div>
							`;
							$("div#mymodalCuerpo").html(cuerpo);
							$("div#mymodalPie").html('');

							$("div#mymodal").modal('toggle');

							activaBoton({ boton:'btn_despacho_total', idbtn:datos.idbtn, nuevoEstado:datos.estado, cantidad_ori:datos.cantidad_ori });
							activaBoton({ boton:'btn_despacho_parcial', idbtn:datos.idbtn, nuevoEstado:datos.estado });
							activaBoton({ boton:'cantidad_despacho_parcial' });

						}
					});
					*/
				}
			});

			$("button.btn_bFacturacion_guardar").off('click');
			$("button.btn_bFacturacion_guardar").click(function(){
				//console.log('btn_bFacturacion_guardar');
				cant = $("tbody#tabla_bFacturacionBODY tr.selected").length;

				if(cant > 0){
					$("tbody#tabla_bFacturacionBODY tr.selected").each(function(){

						idprod = $(this).attr('id');
						fechafa = $(this).find("td[data-field='FECHA_FACTURACION'] input").val();
						remito = $(this).find("td[data-field='REMITO'] input").val();
						sector = $(this).find("td[data-field='SECTOR'] select option:selected").attr('id');

						datos = { acc:'guardarDataFacturacion', idprod:idprod, fechafa:fechafa, remito:remito, sector:sector };
						//console.log(datos);
						if(sector == 3){ //check despacho sin remito !
							if(remito == ''){ toastr.error('Se debe completar el numero re remito para enviar a DESPACHO el item deseado.'); }
							else{ guardarDataFacturacion(datos,function(){}); }
						}
						else{ guardarDataFacturacion(datos,function(){}); }

					});
				}
				else{ toastr.warning('Debe de seleccionar del checkbox al menos una row.'); }







			});
		});

	});

    $("span.botonSalir").off('click');
    $("span.botonSalir").click(function(){
        cerrarSession(function(){
            location.href = "inicio.php";
        });
    });

    $("a#bListarClientes").off('click');
    $("a#bListarClientes").click(function(){
        //console.log('bListarClientes');
        $("div.contenedorHome").css('display','none');
        $("div.contenedorClientes").css('display','none');

        $("div.clientes").css('display','block');
        $("div.listaClientes").css('display','block');

        selClientes({ acc:'selClientes', modo:2 },function(){

            $("button.btnAddCliente2").off('click');
            $("button.btnAddCliente2").click(function(){
                //console.log('btnAddCliente2');
								limpiarForm('clientesAlta',function(){
									selUsuariosVendedor({acc:'selUsuariosVendedores', modo:1},function(){
										$("div.listaClientes").css('display','none');
		                $("div.datosClientes").css('display','block');
		                $("button.btnModificarCliente").css('display','none');
		                $("button.btnCargaCliente").css('display','block');
									});
								});
            });

            $("table#tablaListarClientes").bootstrapTable({
                onPostBody: function(){
                    $("span.botonesMenuCliente").off('click');
                    $("span.botonesMenuCliente").click(function(){
                        id = $(this).attr('id');
                        accion = $(this).attr('accion');

                        switch(accion){
                          case 'edit':
                            $("button.btnCargaCliente").css('display','none');
                            $("button.btnModificarCliente").css('display','block');
                            selClientes({ acc:'selClientes', modo:3, idCliente:id }, function(salida){
															selUsuariosVendedor({acc:'selUsuariosVendedores',modo:1,vendedor:salida.vendedor_id}, function(){
																//console.log('btnCargaCliente');
	                              //console.log(salida);
	                              $("div.listaClientes").css('display','none');
	                              $("div.datosClientes").css('display','block');

	                              $("input#cc_idseiserre").val(salida.idseiserre);
	                              $("input#cc_razonsocial").val(salida.razon_social);
	                              $("input#cc_nombre").val(salida.contacto);
	                              $("input#cc_direccion").val(salida.direccion);
	                              $("input#cc_cp").val(salida.direccion_cp);
	                              $("input#cc_telefono").val(salida.telefono);

	                              $("button.btnModificarCliente").attr('idCliente',salida.id_cliente);

	                              $("button.btnModificarCliente").off('click');
	                              $("button.btnModificarCliente").click(function(){
	                                  //console.log('btnModificarCliente');

	                                  id = $(this).attr('idcliente');
	                                  idseiserre = $("input#cc_idseiserre").val();
	                                  razonsocial = $("input#cc_razonsocial").val();
	                                  nombre = $("input#cc_nombre").val();
	                                  direccion = $("input#cc_direccion").val();
	                                  cp = $("input#cc_cp").val();
	                                  telefono = $("input#cc_telefono").val();
																		vendedor = $("select.cc_vendedor option:selected").attr('id');

	                                  datos = { acc:'modificaCliente', id:id, idseiserre:idseiserre, razonsocial:razonsocial, nombre:nombre, direccion:direccion, cp:cp, telefono:telefono, vendedor:vendedor };
	                                  //console.log(datos);
	                                  modificaCliente(datos,function(){
	                                      $("a#bListarClientes").click();
	                                  });
	                              });
															});

                            });
                          break;

                          case 'del':
                              delCliente(id,function(){
                                  $("a#bListarClientes").click();
                              });
                          break;
                        }

                    });
                }
            });

        });
    });

    $("a#bListaDeProductos").off('click');
    $("a#bListaDeProductos").click(function(){
        //console.log('bListaDeProductos');
        $("div.contenedorHome").css('display','none');
        $("div.contenedorProductos").css('display','none');

        $("div.productos").css('display','block');
        $("div.listaProductos").css('display','block');

        selProductos({ acc:'selProductos', modo:2 },function(){

            $("button.btnAddProducto2").off('click');
            $("button.btnAddProducto2").click(function(){
                //console.log('btnAddCliente2');
                $("div.listaProductos").css('display','none');
                $("div.datosProductos").css('display','block');
                $("button.btnModificarProducto").css('display','none');
                $("button.btnCargaProducto").css('display','block');
            });

            $("table#tablaListarProducto").bootstrapTable({
                onPostBody: function(){
                    $("span.botonesMenuProducto").off('click');
                    $("span.botonesMenuProducto").click(function(){
                        id = $(this).attr('id');
                        accion = $(this).attr('accion');

                        switch(accion){
                            case 'edit':

                                $("button.btnCargaProducto").css('display','none');
                                $("button.btnModificarProducto").css('display','block');

                                selProductos({ acc:'selProductos', modo:3, idProducto:id }, function(salida){
                                    //console.log('btnCargaProductos');
                                    //console.log(salida);
                                    $("div.listaProductos").css('display','none');
                                    $("div.datosProductos").css('display','block');

                                    $("input#ccprod_id").val(salida.idseiserre);
                                    $("input#ccprod_desc").val(salida.descripcion);
                                    $("input#ccprod_stock").val(salida.stock);

                                    $("button.btnModificarProducto").attr('idProducto',salida.id_producto);

                                    $("button.btnModificarProducto").off('click');
                                    $("button.btnModificarProducto").click(function(){
                                        //console.log('btnModificarProducto');

                                        id = $(this).attr('idproducto');
                                        idseiserre = $("input#ccprod_id").val();
                                        descrip = $("input#ccprod_desc").val();
                                        stock = $("input#ccprod_stock").val();

                                        datos = { acc:'modificaProducto', id:id, idseiserre:idseiserre, descrip:descrip, stock:stock };
                                        //console.log(datos);

                                        modificaCliente(datos,function(){
                                            $("a#bListaDeProductos").click();
                                        });

                                    });
                                });

                            break;

                            case 'del':
                                delProducto(id,function(){
                                    $("a#bListaDeProductos").click();
                                });
                            break;
                        }
                    });
                }
            });
        });

    });

	$("a#bReportes_sumadeqxsalida").off('click');
	$("a#bReportes_sumadeqxsalida").click(function(){
		//console.log('bReportes_sumadeqxsalida');
		$("div.contenedorHome").css('display','none');
		$("div.bandejaReportes_sumadeqxsalida").css('display','block');
		reportes({acc:'reportes', reportemod:'sumadeqxsalida'},function(){
			$("table#tablaReporte_sumadeqxsalida").bootstrapTable({
					onPostBody: function(){}
			});
		});
	});

    //------------------------------------------------------------------------

    $("button.ndp_nuevaordendecompra").off('click');
    $("button.ndp_nuevaordendecompra").click(function(){
        //console.log('ndp_nuevaordendecompra');

        noRecord = $("table#odc_productos tbody#odc_productosBODY tr[data-index]").length;
        odcValidador = $("input#ndp_validador").val();
        //cliente = $("select#ndp_listadoCliente option:selected").text();
        cliente = $("input#ndp_listadoCliente").val();
        //idcliente = $("select#ndp_listadoCliente option:selected").attr('id');
        idcliente = $("input#ndp_listadoCliente").attr('idcliente');
        lugarEntrega = $("input#ndp_lugardeentrega").val();
        obser = $("textarea#ndp_observacion").val();
        condiciondepago = $("input#ndp_cdp").val();
        numero_odcc = $("input#ndp_nodcc").val();

        if(noRecord==0) toastr.error('Fallo, debe agregar al menos un producto para cargar su nota de pedido.');
        else if( cliente == '---') toastr.error('Fallo, se debe seleecion el cliente o elegir una fecha de entrega para la nota de pedido.');
        else{
            datos = { acc:'nuevaODC', validador:odcValidador, cliente:cliente, idcliente:idcliente, lugarEntrega:lugarEntrega, obser:obser, condiciondepago:condiciondepago, numero_odcc:numero_odcc };
            //console.log(datos);
            nuevaODC(datos,function(){
                //console.log(datos);
                $("a#bListarODC").click();

                //BLANQUEO EL FORMULARIO
                $("input#ndp_validador").val("");
                $("input#ndp_listadoCliente").val("");
                $("input#ndp_lugardeentrega").val("");
                $("textarea#ndp_observacion").val("");
                $("input#ndp_cdp").val("");
                $("input#ndp_nodcc").val("");

                $("input#ndp_prod_select").val("");
                $("input#ndp_prod_kilogramos").val("");
                $("input#ndp_prod_precioxk").val("");
                $("input#ndp_prod_precioTotal").val("");
                $("input#ndp_prod_codigoCliente").val("");
                $("input#ndp_prod_fecharde").val("");
                $("textarea#ndp_prod_observacion").val("");
            });
        }
    });

	$("button.ndp_modordendecompra").off('click');
	$("button.ndp_modordendecompra").click(function(){
		noRecord = $("table#odc_productos tbody#odc_productosBODY tr[data-index]").length;
		odcValidador = $("input#ndp_validador").val();
		cliente = $("input#ndp_listadoCliente").val();
		idcliente = $("input#ndp_listadoCliente").attr('idcliente');
		lugarEntrega = $("input#ndp_lugardeentrega").val();
		obser = $("textarea#ndp_observacion").val();
		condiciondepago = $("input#ndp_cdp").val();
		numero_odcc = $("input#ndp_nodcc").val();
		idodc = $(this).attr('idlista');
		if(noRecord==0) toastr.error('Fallo, debe agregar al menos un producto para cargar su nota de pedido.');
		else if( cliente == '---') toastr.error('Fallo, se debe seleecion el cliente o elegir una fecha de entrega para la nota de pedido.');
		else{
			datos = { acc:'editarODC', idodc:idodc, validador:odcValidador, cliente:cliente, idcliente:idcliente, lugarEntrega:lugarEntrega, obser:obser, condiciondepago:condiciondepago, numero_odcc:numero_odcc };
			editarODC(datos,function(){
					$("a#bListarODC").click();
					//BLANQUEO EL FORMULARIO
					$("input#ndp_validador").val("");
					$("input#ndp_listadoCliente").val("");
					$("input#ndp_lugardeentrega").val("");
					$("textarea#ndp_observacion").val("");
					$("input#ndp_cdp").val("");
					$("input#ndp_nodcc").val("");
					$("input#ndp_prod_select").val("");
					$("input#ndp_prod_kilogramos").val("");
					$("input#ndp_prod_precioxk").val("");
					$("input#ndp_prod_precioTotal").val("");
					$("input#ndp_prod_codigoCliente").val("");
					$("input#ndp_prod_fecharde").val("");
					$("textarea#ndp_prod_observacion").val("");
					$(this).attr('idlista','');
			});
		}
	});

    $("button.ndp_prod_ADD").off('click');
    $("button.ndp_prod_ADD").click(function(){
        //idproducto = $("select#ndp_prod_select option:selected").attr('idproducto');
        idproducto = $("input#ndp_prod_select").attr('idproducto');
        //nombreProducto = $("select#ndp_prod_select option:selected").html();
        nombreProducto = $("input#ndp_prod_select").val();
        nombreProductoRay = nombreProducto.split('(');

        nombreProductoSolo = nombreProductoRay[0].replace(')','');
        codigoProducto = nombreProductoRay[1].replace(')','');
        kilogramos = $("input#ndp_prod_kilogramos").val();
        precio = $("input#ndp_prod_precioxk").val();
        precioTotal = $("input#ndp_prod_precioTotal").val();
        codigoProductoCliente = $("input#ndp_prod_codigoCliente").val();

        odcValidador = $("input#ndp_validador").val();

        fecharde = $("input#ndp_prod_fecharde").val();
        if(fecharde == '') fecharde = '0000-00-00 00:00:00';

        observacionProd = $("textarea#ndp_prod_observacion").val();

        datos = {
            acc:'nuevoProductoODC',
            validador:odcValidador,
            codigo:codigoProducto,
            idProducto:idproducto,
            nombre:nombreProductoSolo,
            kilogramos:kilogramos,
            precio:precio,
            preciototal:precioTotal,
            codigoProductoCliente:codigoProductoCliente,
            fecharde:fecharde,
            observacionProd:observacionProd
        };

        //console.log(datos);
        nuevoProductoODC(datos,function(){
            limpiarForm('productosNuevaOrden');
            listarProductosODC({ acc:'listarProductosODC', modo:1, validador:odcValidador});
        });
    });

	$("button.ndp_prod_MOD").off('click');
	$("button.ndp_prod_MOD").click(function(){
			//console.log('mod');

			idregistro = $(this).attr('idregistro');
			idproducto = $("input#ndp_prod_select").attr('idproducto');
			nombreProducto = $("input#ndp_prod_select").val();
			nombreProductoRay = nombreProducto.split('(');
			nombreProductoSolo = nombreProductoRay[0].replace(')','');
			codigoProducto = nombreProductoRay[1].replace(')','');
			kilogramos = $("input#ndp_prod_kilogramos").val();
			precio = $("input#ndp_prod_precioxk").val();
			precioTotal = $("input#ndp_prod_precioTotal").val();
			codigoProductoCliente = $("input#ndp_prod_codigoCliente").val();
			odcValidador = $("input#ndp_validador").val();
			fecharde = $("input#ndp_prod_fecharde").val();
			if(fecharde == '') fecharde = '0000-00-00 00:00:00';
			observacionProd = $("textarea#ndp_prod_observacion").val();

			datos = {
					acc:'editarProductoODC',
					idregistro:idregistro,
					codigo:codigoProducto,
					idProducto:idproducto,
					nombre:nombreProductoSolo,
					kilogramos:kilogramos,
					precio:precio,
					preciototal:precioTotal,
					codigoProductoCliente:codigoProductoCliente,
					fecharde:fecharde,
					observacionProd:observacionProd
			};

			//console.log(datos);
			editarProductoODC(datos,function(){
				limpiarForm('productosNuevaOrden');
				listarProductosODC({ acc:'listarProductosODC', modo:1, validador:odcValidador});
		 	});

		});

    $("button.btnCargaCliente").off('click');
    $("button.btnCargaCliente").click(function(){
        //console.log('btnCargaCliente');
        idseis = $("input#cc_idseiserre").val();
        razonsocial = $("input#cc_razonsocial").val();
        contacto = $("input#cc_nombre").val();
        dire = $("input#cc_direccion").val();
        cp = $("input#cc_cp").val();
        telefono = $("input#cc_telefono").val();
				vendedor = $("select.cc_vendedor option:selected").attr('id');

        datos = { acc:'cargarCliente', idseis:idseis, rs:razonsocial, contacto:contacto, dire:dire, cp:cp, telefono:telefono, vendedor:vendedor };
        //console.log(datos);
        cargarCliente(datos, function(){
            $("a#bListarClientes").click();
        });
    });

    $("button.btnCargaProducto").off('click');
    $("button.btnCargaProducto").click(function(){
        //console.log('btnCargaProducto');
        idseiserre = $("input#ccprod_id").val();
        descrip = $("input#ccprod_desc").val();
        stock = $("input#ccprod_stock").val();

        datos = { acc:'cargarProducto', idseiserre:idseiserre, descrip:descrip, stock:stock };
        //console.log(datos);

        cargarProducto(datos, function(){
            $("a#bListaDeProductos").click();
        });

    });

    $("span.btnOCMora").off('click');
    $("span.btnOCMora").click(function(){

        id = $(this).attr('idodc');
        moraStatus = $(this).attr('moraStatus');

        if(moraStatus == 'active'){
            moraStatusTR = 'inactive';
            $("span.btnOCMora").attr('moraStatus',moraStatusTR);
        }
        else{
            moraStatusTR = 'active';
            $("span.btnOCMora").attr('moraStatus',moraStatusTR);
        }

        //console.log(moraStatus);

        setUnsetMora({ acc:'setUnsetMora', id:id, modo:'odc', accion:moraStatus },function(){
            $("a#bListarODC").click();
        });


    });

		//------------------------------------------------------------------------

});

function validarUserPass($user,$pass,callback){
    //console.log($user+" "+$pass);
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'validarUserPass', user:$user, pass:$pass },
		success: function(data){
			console.log(data);
            response = Number(data);

            switch(response){
                case 2: toastr.success('Credenciales ok. Redirigiendo al sitio.'); window.location.href = 'inicio.php'; break;
                case 1: toastr.error('Fallo, las credenciales son incorrectas. Verificar usuario y password.'); break;
                case 3: toastr.error('Fallo, problema en la configuración del sistema. Dar aviso al administrador.'); break;
            }
		},
		error: function(){},
		beforeSend: function(){ toastr.info('Validando credenciales...'); },
		complete: function(){ if(callback) callback(); }
	});


}

function listarProductos(modo, callback){
    $.ajax({
        type:"POST",
		url:'prog/procesar.php',
		data : { acc:'listarProductos', modo:modo },
        success: function(data){
            //console.log(data);
            switch(modo){
                case 1: $("select#ndp_prod_select").html(data); break;
            }
        },
        error: function(){ console.log('error | listarProductos'); },
		complete: function(){ if(callback){callback();} }
    });
}

function nuevaODC(datos,callback){
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			console.log(data);
      response = Number(data);
      if(response == 2) toastr.success('Orden de compra ingresada con exito.');
      else {
        toastr.error('Ops, datos incorrectos o problema al crear la Orden de compra.');
        console.log(data);
      }
		},
		error: function(){ console.log('error | nuevaODC')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function editarODC(datos,callback){
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			//console.log(data);
      response = Number(data);
      if(response == 2) toastr.success('Orden de compra modificada con exito.');
      else {
        toastr.error('Ops, datos incorrectos o problema al modificar la Orden de compra.');
        console.log(data);
      }
		},
		error: function(){ console.log('error | editarODC')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function listarOrdenesDeCompra(datos,callback){
	//console.log(datos);
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			//console.log(data);
			switch(datos.modo){
				case 1:
					$("div#odc_tablaListaDIV").html(data);
					//$("table#odc_tablaLista").bootstrapTable();
				break;

				case 2:
					$("div#odc_tablaLista2DIV").html(data);
					//$("table#odc_tablaLista2").bootstrapTable();
				break;

				case 3:
					data2 = jQuery.parseJSON(data);
					//console.log(data2);
				break;
			}
		},
		error: function(){ console.log('error | listarOrdenesDeCompra'); },
		beforeSend: function(){},
		complete: function(){
			if(datos.modo == 3){ callback(data2); }
			else{ if(callback){callback();} }
		}
	});
}

function setTipoOrdenDeCompra(datos,callback){
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			//console.log(data);
		},
		error: function(){ console.log('error | setTipoOrdenDeCompra')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function nuevoProductoODC(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
			response = Number(data);
            if(response == 2) toastr.success('El producto se cargo con exito en la nota de pedido.');
            else {
                toastr.error('Fallo, no es posible cargar el producto a la nota de pedido.');
                console.log(data);
            }
		},
		error: function(){ console.log('error | nuevoProductoODC'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function editarProductoODC(datos,callback){
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			//console.log(data);
			response = Number(data);
			if(response == 2) toastr.success('El producto se modifico con exito en la nota de pedido.');
			else {
				toastr.error('Fallo, no es posible modificar el producto a la nota de pedido.');
				console.log(data);
			}
		},
		error: function(){ console.log('error|editarProductoODC'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function listarProductosODC(datos,callback){
    //console.log('listarProductosODC');
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
            switch(datos.modo){
                case 1:
								case 3:
                    $("div#ndp_productosDIV").html(data);
                    //BOOSTRAPTABLE DE PRODUCTOS ---
                    $("table#odc_productos").bootstrapTable({
                        onPostBody: function(){

                            $("table#odc_productos tr td.accion").off('click');

														$("span.botonesMenuProdNDP").off('click');
                            $("span.botonesMenuProdNDP").click(function(){

																id = $(this).attr('idregistro');
																modo = $(this).attr('id');
																//console.log(id);

																switch(modo){

																	case 'del':
																		delProductoODC(id,function(){
																				odcValidador = $("input#ndp_validador").val();
																				listarProductosODC({ acc:'listarProductosODC', modo:1, validador:odcValidador }, function(){});
																		});
																	break;

																	case 'edit':
																		//console.log('editdelproducto');

																		selProductoODC({ acc:'selProductoODC', id:id },function(respuesta){
																			//console.log(respuesta);

																			odcprod_nombre = respuesta.nombre;
																			odcprod_codigo = respuesta.codigo;
																			idprod = respuesta.id_producto;
																			odcprod_kilogramos = respuesta.kilogramos;
																			odcprod_precio = respuesta.precio;
																			odcprod_precioTotal = respuesta.precio_total;
																			odcprod_cpc = respuesta.codigopc;
																			odcprod_frde = respuesta.fecha_rde;
																			odcprod_observacion = respuesta.observacion;

																			$("input#ndp_prod_select").val(odcprod_nombre+' ('+odcprod_codigo+')');
																			$("input#ndp_prod_select").attr('idproducto',idprod);
																			$("input#ndp_prod_kilogramos").val(odcprod_kilogramos);
																			$("input#ndp_prod_precioxk").val(odcprod_precio);
																			$("input#ndp_prod_precioTotal").val(odcprod_precioTotal);
																			$("button.ndp_prod_MOD").attr('idregistro',id);

																			$("input#ndp_prod_codigoCliente").val(odcprod_cpc);
																			$("input#ndp_prod_fecharde").val(odcprod_frde);
																			$("textarea#ndp_prod_observacion").val(odcprod_observacion);

																			$('body,html').stop(true,true).animate({
																				scrollTop: $("div.panelDeProductos").offset().top
																			},1000);

																		});

																	break;

																}

                            });
                        }
                    });
                break;

                case 2:
                    $("div#odc_productosDIV2").html(data);
                    $("table#odc_productos2").bootstrapTable({
                        onPostBody: function(){
                            //$('#myModalUpdateImg').modal();
                        }
                    });
                break;
            }
		},
		error: function(){ console.log('error | listarProductosODP'); },
		beforeSend: function(){},
		complete: function(){ if(callback){callback();} }
	});
}

function delProductoODC(id,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'delProductoODC', id:id },
		success: function(data){
            //console.log(data);
		},
		error: function(){ console.log('error | delProductoODC'); },
		beforeSend: function(){},
		complete: function(){ if(callback){callback();} }
	});
}

function getMD5(datos,callback){
    //console.log('md5 = '.datos);
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(datos);

            response = data.trim();
            switch(datos.modo){
                case 1: $("input#ndp_validador").val(response); break;
            }
		},
		error: function(){ console.log('error | getMD5'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

//function cambioDeEstadoODP(idprod, nuevoEstado, callback){
function cambioDeEstadoODP(datos, callback){
    //console.log('cambioDeEstadoODP');
	//console.log(datos);

	/*
	if(datos.estado == 3){
		//console.log(datos.estado);
		$("h4#mymodalTitulo").html('Enviar a despacho');

		cuerpo = `
			<div>
				<h4>Elegir opcion total o parcial</h4>
				<button class="btn btn-primary btn_despacho_total" style="width:100%;">Total</button>
				<div class="input-group" style="margin-top:20px;">
					<input type="text" class="form-control cantidad_despacho_parcial" placeholder="Cantidad a despachar" aria-describedby="basic-addon2">
					<span class="input-group-addon btn btn-primary btn_despacho_parcial" id="basic-addon2">Parcial</span>
				</div>
			</div>
		`;
		$("div#mymodalCuerpo").html(cuerpo);
		$("div#mymodalPie").html('');

		$("div#mymodal").modal('toggle');

		activaBoton({ boton:'btn_despacho_total', idbtn:datos.idbtn, nuevoEstado:datos.estado, cantidad_ori:datos.cantidad_ori });
		activaBoton({ boton:'btn_despacho_parcial', idbtn:datos.idbtn, nuevoEstado:datos.estado });
		activaBoton({ boton:'cantidad_despacho_parcial' });
	}
	else{}
	*/
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'cambioDeEstadoODP', idprod:datos.idbtn, nuevoEstado:datos.estado },
		success: function(data){
			response = data.trim();
			if(response == 2) toastr.success('El producto ha cambiado de bandeja asignada.');
			else{ console.log(data); }
		},
		error: function(){ console.log('error | cambioDeEstadoODP'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});


}

function limpiarODCPROD(callback){
  //console.log('limpiarODCPROD');
  $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'limpiarODCPROD' },
		success: function(data){},
		error: function(){ console.log('error | limpiarODCPROD'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function cerrarSession(callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'cerrarSession' },
		success: function(data){},
		error: function(){ console.log('error | cerrarSession'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function generaImpresion(datos,callback){
    //console.log(datos);
		switch(datos.modo){
				case "enviaDatos":
						$.ajax({
								type:"POST",
								url:'prog/procesar.php',
								data : { acc:'enviaDatos', validador:datos.validador },
								async:true,
								success: function(data){
										//console.log(data);
										$.ajax({
												type: "POST",
												url: "libraries/php/dompdf/report.php",
												data: { 'papel':'letter', 'orientacion':'portrait', 'contenido':data, 'nombre':'NOTA DE PEDIDO #'+datos.idODC+'.pdf' },
												success: function(data){},
												complete: function(){ window.open("libraries/php/dompdf/report.php"); }
										});
								},
								error: function(){ console.log('error|enviaDatos'); },
								beforeSend:function(){},
								complete:function(){}
						});
				break;

				case "enviaWeb":
				break;
		}
}

function bandejas(datos,callback){
    //console.log(datos);
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
            response = Number(data);
            if(data == 1){ console.log('error'); }
            else{
                switch(datos.idbandeja){
                    case 2: $("div#bProduccionDATA").html(data); break;
                    case 4: $("div#bIonicsDATA").html(data); break;
                    case 3:
						if(datos.acc=='despachoV2'){ $("div#bDespachoDATAV2").html(data); }
						else $("div#bDespachoDATA").html(data);
					break;
                    case 5: $("div#bSinStockDATA").html(data); break;
					case 6: $("div#bFacturacionDATA").html(data); break;
                }
            }
		},
		error: function(){ console.log('error | bandejas'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function cerrarOrdenDeActividad(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
            response = Number(data);

            switch(response){
                case 10: console.log('ok'); break;
                case 11:
                case 3:
                case 5: toastr.error('Ops, hubo un error en el sistema.'); break;
                case 2: toastr.warning('Uno de los productos de la orden de actividad no tiene informado el <strong>Numero de remito de entrega</strong> corrija el faltante para poder continuar.'); break;
                case 4: toastr.warning('Todos los productos de la orden deben de estar en estado "despacho" para poder continuar.'); break;
                default: console.log(data);
            }

        },
		error: function(){ console.log('error | cerrarOrdenDeActividad'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function guardarCambiosBandejaProd(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El cambio se ha guardado correctamente.');
                    $("a#bBandejaProduccion").click();
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar guardar los cambios.');
                    console.log(data);
            }
        },
		error: function(){ console.log('error | guardarCambiosBandejaProd'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function guardarCambiosBandejaIonics(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El cambio se ha guardado correctamente.');
                    $("a#bBandejaIonics").click();
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar guardar los cambios.');
                    console.log(data);
            }
        },
		error: function(){ console.log('error | guardarCambiosBandejaIonics'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function guardarCambiosBandejaDespacho(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El cambio se ha guardado correctamente.');

					bandejas({ acc:'bandejas', idbandeja:3, busca:datos.busca },function(){
			            $("table#tabla_bDespacho").bootstrapTable({
			                onPostBody: function(){
			                    activaBoton({ boton:'tabla_bDespacho' });
			                }
			            });
			        });
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar guardar los cambios.');
                    console.log(data);
            }
        },
		error: function(){ console.log('error | guardarCambiosBandejaDespacho'); },
		beforeSend: function(){},
		complete: function(){if(callback){callback();}}
	});
}

function setUnsetMora(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('La orden se ha modificado correctamente.');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar modificar la orden.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error | setUnsetMora')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function observacionesODC(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            resultado = JSON.parse(data);
            //resultado = data;
        },
		error: function(){ console.log('error | observacionesODC')},
		beforeSend: function(){},
		complete: function(){ callback(resultado); }
	});
}

//CLIENTES ----
function selClientes(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			//console.log(data);
            switch(datos.modo){
                case 1: $("select#ndp_listadoCliente").html(data); break;
                case 2: $("div.clientes div.listaClientes").html(data); break;
                case 3: resultado = JSON.parse(data); break;
            }

		},
		error: function(){ console.log('error | selClientes'); },
		beforeSend: function(){
            switch(datos.modo){
                case 2: $("div.clientes div.listaClientes").html("Cargando listado de clientes..."); break;
            }
        },
		complete: function(){
            //console.log(datos.modo);
            switch(datos.modo){
                case 1:
                case 2: if(callback){callback();} break;
                case 3: callback(resultado); break;
            }


        }
	});
}

function cargarCliente(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El cliente se ha cargado correctamente.');
                    limpiarForm('clientesAlta');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar cargar el cliente.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error | cargarCliente')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});

}

function modificaCliente(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El cliente se ha modificado correctamente.');
                    limpiarForm('clientesAlta');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar modificar el cliente.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error | modificaCliente')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function delCliente(id,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'delCliente', id:id },
		success: function(data){
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El cliente se ha eliminado correctamente.');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar eliminar el cliente.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error | delCliente')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function limpiarForm(formulario,callback){
    switch(formulario){
        //FORMULARIO CLIENTES ALTAS
        case 'clientesAlta':
          $("input#cc_idseiserre").val("");
          $("input#cc_razonsocial").val("");
          $("input#cc_nombre").val("");
          $("input#cc_direccion").val("");
          $("input#cc_cp").val("");
          $("input#cc_telefono").val("");
					if(callback){ callback(); }
        break;

        //FORMULARIO PRODUCTOS ALTAS
        case 'productosAlta':
          $("input#ccprod_id").val("");
          $("input#ccprod_desc").val("");
          $("input#ccprod_stock").val("");
					if(callback){ callback(); }
        break;

				case 'nuevaOrden':
					$("input#ndp_listadoCliente").val("");
					$("input#ndp_lugardeentrega").val("");
					$("textarea#ndp_observacion").val("");
					$("input#ndp_cdp").val("");
					$("input#ndp_nodcc").val("");
				break;

        //FORMULARIO DE PRODUCTOS EN NUEVA ORDEN
        case 'productosNuevaOrden':
				  $("input#ndp_prod_select").val("");
          $("input#ndp_prod_kilogramos").val("");
          $("input#ndp_prod_precioxk").val("");
          $("input#ndp_prod_precioTotal").val("");
          $("input#ndp_prod_codigoCliente").val("");
          $("input#ndp_prod_fecharde").val("");
          $("textarea#ndp_prod_observacion").val("");
					if(callback){ callback(); }
        break;

				//FORMULARIO DE USUARIOS
				case 'usuariosAlta':
					$("input.users_username").val("");
					$("input.users_password").val("");
					$("input.users_nombre").val("");
					$("input.users_apellido").val("");
					$("input.users_permisos_carga").val("");
					$("input.users_permisos_consultas").val("");
					$("input.users_permisos_altas").val("");
					$("input.users_permisos_bajas").val("");
					$("input.users_permisos_modificaciones").val("");
					$("input.users_permisos_reportes").val("");
					$("input.users_permisos_ceoda").val("");
					$("input.users_permisos_ceprod").val("");
					$("input.users_permisos_ceionics").val("");
					$("input.users_permisos_cedesp").val("");
					$("input.users_permisos_cesinstock").val("");
					$("input.users_permisos_cioda").val("");
					$("input.users_permisos_ciprod").val("");
					$("input.users_permisos_ciionics").val("");
					$("input.users_permisos_cidesp").val("");
					$("input.users_permisos_cierreorden").val("");
					$("input.users_permisos_moraorden").val("");
					$("input.users_permisos_editorden").val("");
					$("input.users_permisos_admin").val("");
					$("input.users_permisos_administracion").val("");
					$("input.users_permisos_adminvent").val("");
					$("input.users_permisos_vendedor").val("");
					if(callback){ callback(); }
				break;
    }
}

//USUARIOS ----
function selUsuarios(datos,callback){
    $.ajax({
		type:"POST",
        url:'prog/procesar.php',
        data : datos,
        success: function(data){
            //console.log(data);
            switch(datos.modo){
                //case 1: $("select#ndp_listadoCliente").html(data); break;
                case 2: $("div.listaUsuarios").html(data); break;
                case 3:
					resultado = JSON.parse(data);

					//console.log(resultado);

					/*
					permisos = $.parseJSON(resultado.permisos);
					console.log('permisos');
					console.log(permisos);
					*/
				break;
            }
        },
        error: function(){ console.log('error | selUsuarios'); },
        beforeSend: function(){
            switch(datos.modo){
                case 2: $("div.listaUsuarios").html("Cargando listado de usuarios..."); break;
            }
        },
        complete: function(){
            //console.log(datos.modo);
            switch(datos.modo){
                //case 1:
                case 2: if(callback){callback();} break;
                case 3: callback(resultado); break;
            }
        }
	});
}

function cargarUsuario(datos,callback){
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			response = Number(data);
			switch(response){
				case 2:
					toastr.success('El usuario se ha cargado correctamente.');
					limpiarForm('usuariosAlta');
				break;
				default:
					toastr.error('Ops!, hubo un problema al intentar cargar el usuario.');
					console.log(data);
				}
		},
		error: function(){ console.log('error | cargarUsuario')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function modificarUsuario(datos,callback){
		$.ajax({
				type:"POST",
				url:'prog/procesar.php',
				data : datos,
				success: function(data){
						response = Number(data);
						switch(response){
								case 2:
										toastr.success('El usuario se ha modificado correctamente.');
										limpiarForm('usuariosAlta');
								break;
								default:
										toastr.error('Ops!, hubo un problema al intentar modificar el usuario.');
										console.log(data);
						}
				},
				error: function(){ console.log('error | modificarUsuario')},
				beforeSend: function(){},
				complete: function(){ if(callback) callback(); }
		});
}

function delUsuario(datos,callback){
	//console.log(datos);
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			response = Number(data);
			switch(response){
				case 2:
					toastr.success('El usuario se ha eliminado correctamente.');
				break;
				default:
					toastr.error('Ops!, hubo un problema al intentar eliminar el usuario.');
					console.log(data);
			}
		},
		error: function(){ console.log('error | delUsuario')},
		complete: function(){ if(callback) callback(); }
	});
}

function selUsuariosVendedor(datos,callback){
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			//console.log(data);
			switch(datos.modo){
				case 1: $("select.cc_vendedor").html(data); break;
			}
		},
		error: function(){ console.log('error | selUsuariosVendedor'); },
		complete: function(){
			//console.log(datos.modo);
			switch(datos.modo){
				case 1: if(callback){callback();} break;
			}
		}
	});
}

//PRODUCTOS ---
function selProductos(datos,callback){
    //console.log('selProductos');
    $.ajax({
			type:"POST",
			url:'prog/procesar.php',
			data : datos,
			success: function(data){
			//console.log(data);
            switch(datos.modo){
                case 2: $("div.productos div.listaProductos").html(data); break;
                case 3: resultado = JSON.parse(data); break;
            }
        },
      error: function(){ console.log('error | selProductos'); },
      beforeSend: function(){
            switch(datos.modo){
                case 2: $("div.productos div.listaProductos").html("Cargando listado de productos..."); break;
            }
        },
      complete: function(){
            switch(datos.modo){
                case 1:
                case 2: if(callback){callback();} break;
                case 3: callback(resultado); break;
            }
        }
    });
}

function cargarProducto(datos,callback){
    //console.log('cargarProducto');

    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            //console.log(data);
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El producto se ha cargado correctamente.');
                    limpiarForm('productosAlta');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar cargar el producto.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error | cargarProducto')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});

}

function modificaProducto(datos,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El producto se ha modificado correctamente.');
                    limpiarForm('productosAlta');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar modificar el producto.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error | modificaProducto')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function delProducto(id,callback){
    $.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'delProducto', id:id },
		success: function(data){
            response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El producto se ha eliminado correctamente.');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar eliminar el producto.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error | delProducto')},
		beforeSend: function(){},
		complete: function(){ if(callback) callback(); }
	});
}

function selProductoODC(datos,callback){
	//console.log('selProductoODC');
	//console.log(datos);
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		dataType:'json',
		success: function(data){
			//console.log(data);
			datos = data;
		},
		error: function(){ console.log('error|selProductoODC'); },
		beforeSend: function(){},
		complete: function(){ callback(datos); }
	});
}

function llamarModal(datos,callback){
    console.log(datos);
}

//REPORTES ---
function reportes(datos,callback){
	//console.log(datos);
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			switch(datos.reportemod){
				case 'sumadeqxsalida': $("div#bsumadeqxsalidaDATA").html(data); break;
			}
		},
		error: function(){ console.log('error | reportes | '+datos.reportemod); },
		beforeSend: function(){
			switch(datos.reportemod){
				case 'sumadeqxsalida': $("div#bsumadeqxsalidaDATA").html("Generando reporte, por favor espere..."); break;
			}
		},
		complete: function(){ if(callback){ callback(); } }
	});
}

//ACTIVADOR DE BOTONES ----
function activaBoton(datos,callback){
	switch(datos.boton){

		case 'tabla_bDespacho':
			$("td.bDespacho_fte input").datepicker({ showButtonPanel: true, showAnim: 'fadeIn', dateFormat: 'yy-mm-dd' });

			$("button.bDespacho_guardarProd").off('click');
			$("button.bDespacho_guardarProd").click(function(){
				//console.log('button.bDespacho_guardarProd');

				prodID = $(this).parent().parent().attr('id');
				obser = $("input#bDespacho_obser"+prodID).val();
				fecha_tde = $("input#bDespacho_fte"+prodID).val();
				nremito = $("span#bDespacho_remito"+prodID).html();
				busqueda = $("div#bDespachoDATA div.search input").val();

				datos = { acc:'guardarCambiosBandejaDespacho', prodID:prodID, fecha_tde:fecha_tde, obser:obser, nremito:nremito, busca:busqueda };
				//console.log(datos);
				guardarCambiosBandejaDespacho(datos,function(){});
			});
		break;

		case 'btn_despacho_total':
			$("button.btn_despacho_total").off('click');
			$("button.btn_despacho_total").click(function(){
				//console.log('despacho_total');
				enviaradespacho({ acc:'enviaradespacho', idbtn:datos.idbtn, nuevoEstado:datos.nuevoEstado, cantidad:datos.cantidad_ori, modo:'total' });
				if(callback){ callback(); }
			});
		break;

		case 'btn_despacho_parcial':
			$("span.btn_despacho_parcial").off('click');
			$("span.btn_despacho_parcial").click(function(){
				//console.log('despacho_parcial');
				cantidad = $("input.cantidad_despacho_parcial").val();
				//console.log('cantidad = '+cantidad);

				if(Number(cantidad)>0){
					enviaradespacho({ acc:'enviaradespacho', idbtn:datos.idbtn, nuevoEstado:datos.nuevoEstado, cantidad:cantidad, modo:'parcial' });
				}
				else{ toastr.warning('La cantidad no puede ser menor a 1.'); }
				if(callback){ callback(); }

			});
		break;

		case 'cantidad_despacho_parcial':
			$("input.cantidad_despacho_parcial").off('keyup');
			$("input.cantidad_despacho_parcial").keyup(function(){
				valor = $(this).val();
				valor = valor.replace(/[^\d]/,'');
				$(this).val(valor);
			});
		break;

		//this.value=this.value.replace(/[^\d]/,'')



	}
}

function enviaradespacho(datos,callback){
	console.log(datos);

	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			console.log(data);
		},
		error: function(){ console.log('error|enviaradespacho'); },
		beforeSend: function(){},
		complete: function(){ if(callback){ callback(); } }
	});
}

function guardarDataFacturacion(datos,callback){
	//console.log(datos);
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : datos,
		success: function(data){
			response = Number(data);
            switch(response){
                case 2:
                    toastr.success('El producto se ha grabado correctamente.');
                break;
                default:
                    toastr.error('Ops!, hubo un problema al intentar grabar el producto.');
                    console.log(data);
            }
		},
		error: function(){ console.log('error|guardarDataFacturacion'); },
		beforeSend: function(){},
		complete: function(){ if(callback){ callback(); } }
	});
}

function showSession(){
	$.ajax({
		type:"POST",
		url:'prog/procesar.php',
		data : { acc:'showSession' },
		success: function(data){
			console.log(data);
		},
		error: function(){ console.log('error | showSession')}
	});
}
