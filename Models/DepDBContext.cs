using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Emp_Dep_Api_Angular.Models
{
    public partial class DepDBContext : DbContext
    {
        public DepDBContext()
        {
        }

        public DepDBContext(DbContextOptions<DepDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<MigrationHistory> MigrationHistory { get; set; }
        public virtual DbSet<Position> Position { get; set; }
        public virtual DbSet<PositionDepartments> PositionDepartments { get; set; }
        public virtual DbSet<StaffRestrict> StaffRestrict { get; set; }

       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.DepartName).IsRequired();
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasIndex(e => e.DepartmentId)
                    .HasName("IX_DepartmentID");

                entity.HasIndex(e => e.PositionId)
                    .HasName("IX_PositionID");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.PositionId).HasColumnName("PositionID");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_dbo.Employee_dbo.DepartmentID");

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.PositionId)
                    .HasConstraintName("FK_dbo.Employee_dbo.PositionID");
            });

            modelBuilder.Entity<MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey });

                entity.ToTable("__MigrationHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.Model).IsRequired();

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.Property(e => e.PositionId).HasColumnName("PositionID");

                entity.Property(e => e.PositionName).IsRequired();
            });

            modelBuilder.Entity<PositionDepartments>(entity =>
            {
                entity.HasKey(e => new { e.PositionId, e.DepartmentId });

                entity.HasIndex(e => e.DepartmentId)
                    .HasName("IX_DepartmentID");

                entity.HasIndex(e => e.PositionId)
                    .HasName("IX_PositionID");

                entity.Property(e => e.PositionId).HasColumnName("PositionID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.PositionDepartments)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_dbo.PositionDepartments_dbo.DepartmentID");

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.PositionDepartments)
                    .HasForeignKey(d => d.PositionId)
                    .HasConstraintName("FK_dbo.PositionDepartments_dbo.PositionID");
            });

            modelBuilder.Entity<StaffRestrict>(entity =>
            {
                entity.HasIndex(e => e.DepartmentId)
                    .HasName("IX_DepartmentID");

                entity.HasIndex(e => e.PositionId)
                    .HasName("IX_PositionID");

                entity.Property(e => e.StaffRestrictId).HasColumnName("StaffRestrictID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.PositionId).HasColumnName("PositionID");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.StaffRestrict)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_dbo.StaffRestrict_dbo.DepartmentID");

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.StaffRestrict)
                    .HasForeignKey(d => d.PositionId)
                    .HasConstraintName("FK_dbo.StaffRestrict_dbo.PositionID");
            });
        }
    }
}
