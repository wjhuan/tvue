import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/UserLayout.vue'),
      children: [
        {
          path: '/user',
          redirect: '/user/login'
        },
        {
          path: '/user/login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/user/Login.vue')
        },
        {
          path: '/user/register',
          name: 'register',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/user/Register.vue')
        }
      ]
    },
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BasicLayout.vue'),
      children: [
        // dashboard
        {
          path: '/',
          redirect: '/dashboard/analysis'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { icon: 'dashboard', title: '仪表盘' },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: { title: '分析页' },
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ './views/dashboard/Analysis.vue'
                )
            }
          ]
        },
        // form
        {
          path: '/form',
          name: 'form',
          component: { render: h => h('router-view') },
          meta: { icon: 'form', title: '表单', authority: ['admin'] },
          children: [
            {
              path: '/form/basic-form',
              name: 'basicform',
              meta: { title: '基础表单' },
              component: () =>
                import(
                  /* webpackChunkName: "form" */ './views/forms/BasicForm.vue'
                )
            },
            {
              path: '/form/step-form',
              name: 'stepform',
              meta: { title: '分布表单' },
              component: () =>
                import(
                  /* webpackChunkName: "form" */ './views/forms/stepForm/index.vue'
                ),
              children: [
                {
                  path: '/form/step-form',
                  redirect: '/form/step-form/info'
                },
                {
                  path: '/form/step-form/info',
                  name: 'info',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/forms/stepForm/Step1.vue'
                    )
                },
                {
                  path: '/form/step-form/confirm',
                  name: 'confirm',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/forms/stepForm/Step2.vue'
                    )
                },
                {
                  path: '/form/step-form/result',
                  name: 'result',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/forms/stepForm/Step3.vue'
                    )
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
