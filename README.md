# 秋天的燕子

> 又名：燕子的秋天

 ### 这个项目是前后端分离的项目
* 前端书写：Vue，工具：vsCode
* 后端书写：Abp，工具：vs2019
 ### 此项目是专人专享，样式多出自星巴克

```vue
<vue>
```
> 与后台连接的方法

* 登录
    * 账号（系统给账号 递增）
    * 密码 
* 注册
    * 姓名
    * 密码
    * 生日
    * 是否弃用
    * 是否是vip
* 后台方法
    * 创建后返回id
    * 用id查出numbring
    * 用numbring和密码查询出是否有此人（是否弃用还没用上）
vs2019.net core的版本太低问题

>Dotnet core sdk3.1 runtime 3.1下载地址:

https://dotnet.microsoft.com/download/dotnet-core/3.1

> 数据库迁移 EF下的EF文件夹

```c#
public DbSet<UserTable> UserTable { get; set; }
```

1、Add-Migration 表名

2、update-database 

```c#
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using GsfCoffee.CoffeeUser;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsfCoffee.Coffee
{
    public class GsfInitAppService : GsfCoffeeAppServiceBase, IGsfInitAppService
    {
        private readonly IRepository<UserTable> _repository;

        Task IGsfInitAppService.Register { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        Task<ListResultDto<UserTable>> IGsfInitAppService.Login { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public GsfInitAppService(IRepository<UserTable> repository) {
            _repository = repository;
        }
        [HttpPost]
        /// <summary>
        /// 注册信息
        /// </summary>
        public int Register(UserTable _userTable)
        {
            var ustb = ObjectMapper.Map<UserTable>(_userTable);
            int id = _repository.InsertAndGetId(ustb);
            return id;
        }
        [HttpPost]
        /// <summary>
        /// 查询信息 登录
        /// </summary>
        /// <param name="userid">用户名</param>
        /// <param name="pwd">用户密码</param>
        /// <returns></returns>
        public async Task<ListResultDto<UserTable>> Login(int Num,string pwd)
        {
            var usertable = await _repository
                .GetAll()
                .Where(c => c.Numbering == Num && c.PassWord == pwd)
                .ToListAsync();
            return new ListResultDto<UserTable>(ObjectMapper.Map<List<UserTable>>(usertable));
        }
        [HttpGet]
        /// <summary>
        /// 用id取编码Numbering
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        public async Task<int?> GetByid(int id)
        {
            var usertable = await _repository
                .GetAll()
                .Where(c => c.Id == id)
                .ToListAsync();
            return new ListResultDto<UserTable>(ObjectMapper.Map<List<UserTable>>(usertable)).Items[0].Numbering;
        }
        [HttpPost]
        /// <summary>
        /// 查询所有的信息 
        /// 是否是vip 默认为是 
        /// 是否弃用 默认是否
        /// </summary>
        /// <param name="Delivery">是否是vip 默认为是</param>
        /// <param name="Deprecated">是否弃用 默认是否</param>
        /// <returns></returns>
        public async Task<ListResultDto<UserTable>> GetAllasync( bool Delivery = true,bool Deprecated = false) {
            var usertable = await _repository
                .GetAll()
                .Where(c=>c.Delivery==Delivery && c.Deprecated == Deprecated)
                .ToListAsync();
            return new ListResultDto<UserTable>(ObjectMapper.Map<List<UserTable>>(usertable));
        }
        [HttpPost]
        /// <summary>
        /// 修改账户信息
        /// </summary>
        /// <param name="_userTable"></param>
        public async void Updateasync(UserTable _userTable) {
            try
            {
                if (_userTable != null)
                {
                    var task = ObjectMapper.Map<UserTable>(_userTable);
                    await _repository.UpdateAsync(task);
                }
            }
            catch { 
                
            }
        }
    }
}


//接口 也需要引用IApplicationService
public interface IGsfInitAppService: IApplicationService
    {
       int Main { get; set; }
    }
//实体
[Table("UserTable")]
    public class UserTable: Abp.Domain.Entities.Entity
    {
        /// <summary>
        /// 重写id
        /// </summary>
        public override int Id { get; set; }
        /// <summary>
        /// 账户姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 账户密码
        /// </summary>
        public string PassWord { get;set; }
        /// <summary>
        /// 性别
        /// </summary>
        public string Resource { get; set; }
        /// <summary>
        /// 生日
        /// </summary>
        public DateTime? Date { get; set; }
        /// <summary>
        /// 店面
        /// </summary>
        public string Region { get; set; }
        /// <summary>
        /// 是否是vip
        /// </summary>
        public bool Delivery { get; set; }
        /// <summary>
        /// 爱好
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// 是否弃用
        /// </summary>
        public bool Deprecated { get; set; }
        /// <summary>
        /// 弃用时间
        /// </summary>
        public DateTime? DeprecatedTime { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }
        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime? UpdateTime { get; set; }
        /// <summary>
        /// 不重复编号
        /// </summary>
        public int? Numbering { get; set; }
    }

    
```

# VS2019 无法连接到Web服务器“IIS Express”

> 解决方案：删除掉项目根文件夹下的***隐藏***文件.vs和.Git

> 跨域问题

>目前的解决方案：
项目中的appsetting.json文件

```c#
{
  "ConnectionStrings": {
    "Default": "Server=*******; Database=GsfCoffeeDb; User=sa; Password=******;"
  },
  "App": {
    "ServerRootAddress": "http://localhost:21021/",
    //"ServerRootAddress": "http://106.15.75.186:8080",
    "ClientRootAddress": "http://localhost:4200/",
    "CorsOrigins": "http://localhost:4200,http://localhost:8080,http://localhost:8081,http://localhost:3000,http://106.15.75.186:8080"
  },
  "Authentication": {
    "JwtBearer": {
      "IsEnabled": "true",
      "SecurityKey": "GsfCoffee_C421AAEE0D114E9C",
      "Issuer": "GsfCoffee",
      "Audience": "GsfCoffee"
    }
  }
}
```

> 将发布后的appsetting.json文件中修改
"ServerRootAddress": "http://localhost:21021/",
将"http://localhost:21021/"修改为"http://外网:8080/"
然后网站绑定的是两个网址 外网:8080/，内网:8080/

> 数据库创建触发器 修改数据时自动修改updatetime为当前时间

```sql
--自动修改 “修改时间”
Create TRIGGER [dbo].[update_UserTable_trigger]
 ON [dbo].[UserTable]
 after update
 as 
 declare @id int
 begin
 update UserTable set UpdateTime = SYSDATETIME() WHERE ID IN (SELECT DISTINCT ID FROM inserted)
 
 --修改numbering最大值
 Create TRIGGER [dbo].[number]
on [dbo].[UserTable]
after insert
as
declare @num int
begin
 select @num=max(numbering) from UserTable
 update UserTable set numbering=@num+1
 where ID in (select ID from inserted)
END
```

### 在iis上vs2019的Web部署

网站来源链接：https://www.cnblogs.com/ancm/p/11110200.html
* 1、服务器上下载Web Deploy
网址：https://www.iis.net/downloads/microsoft/web-deploy
.net core sdk 以及runtime 需要更新到3.1
https://dotnet.microsoft.com/download/dotnet-core
* 2、安装完成后
* 3、打开服务web management service，iis管理器权限添加上管理员的名字
* 4、将防火墙打开一个入站规则端口：8172在阿里云后台管理控制台上也要打开端口8172
* 5、右键站点-->部署-->启用web deploy发布
* 6、vs2019 web发布

> 验证连接出现对号就证明连接ok

> 署名：代礼家 
