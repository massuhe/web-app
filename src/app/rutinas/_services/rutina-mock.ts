export const RUTINA_JSON = {
  rutina: {
    id: 1,
    numero_rutina: 1,
    fecha_inicio: '2018-04-15',
    fecha_fin: null,
    total_semanas: 5,
    dias: [
      {
        id: 1,
        series: [
          {
            id: 1,
            vueltas: '4',
            macro_descanso: "1' 20''",
            observaciones: null,
            items: [
              {
                id: 1,
                micro_descanso: null,
                observaciones: null,
                parametros_semana: [
                  {
                    id: 1,
                    semana: 1,
                    repeticiones: '10',
                    parametros: [
                      {
                        id: 1,
                        carga: '50kg',
                        clase_especifica_id: 3,
                        clase: {
                          id: 3,
                          fecha: '2018-02-12 00:00:00',
                          suspendida: 0,
                          motivo: null,
                          descripcion_clase: 3
                        }
                      }
                    ]
                  },
                  { id: 2, semana: 2, repeticiones: '20', parametros: [] },
                  { id: 3, semana: 3, repeticiones: '10', parametros: [] }
                ],
                ejercicio: {
                  id: 1,
                  nombre: 'Press plano',
                  created_at: '2018-04-21 00:00:00'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  ultima_semana: 1
};
