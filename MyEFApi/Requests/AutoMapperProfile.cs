using AutoMapper;
using DAL.Models;

namespace MyEFApi.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUser, UserRequest>()
                   .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserRequest, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<ApplicationUser, UserEditRequest>()
                .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserEditRequest, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            //CreateMap<ApplicationUser, UserPublicRegisterViewModel>()
            //    .ReverseMap()
            //    .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            //CreateMap<ApplicationUser, UserPatchViewModel>()
            //    .ReverseMap();

            //CreateMap<ApplicationRole, RoleViewModel>()
            //    .ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
            //    .ForMember(d => d.UsersCount, map => map.MapFrom(s => s.Users != null ? s.Users.Count : 0))
            //    .ReverseMap();
            //CreateMap<RoleViewModel, ApplicationRole>()
            //    .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            //CreateMap<IdentityRoleClaim<string>, ClaimViewModel>()
            //    .ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
            //    .ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
            //    .ReverseMap();

            //CreateMap<ApplicationPermission, PermissionViewModel>()
            //    .ReverseMap();

            //CreateMap<IdentityRoleClaim<string>, PermissionViewModel>()
            //    .ConvertUsing(s => (PermissionViewModel)ApplicationPermissions.GetPermissionByValue(s.ClaimValue));

            //CreateMap<Customer, CustomerViewModel>()
            //    .ReverseMap();

            //CreateMap<Product, ProductViewModel>()
            //    .ReverseMap();

            //CreateMap<Order, OrderViewModel>()
            //    .ReverseMap();
        }
    }
}